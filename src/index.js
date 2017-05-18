/**
 * Created on 5/5/16.
 */
import simpleLogger from 'simple-logger';
import socketIo from 'socket.io';
import adapter from 'socket.io-redis';
import Redis from 'redis';

import HTTP from './server/http';
import config from './config';
import serverProxy from './proxy/server';

const logger = simpleLogger.getLogger(config.logger.category);
logger.setLevel(config.logger.level);

global.logger = logger;

const ENV = process.env.NODE_ENV;

// const redis = Redis.createClient;

// const pub = redis(config.redis.port, config.redis.host, {
//   detect_buffers: true,
//   return_buffers: false,
//   auth_pass: config.redis.options.auth_pass
// });
// const sub = redis(config.redis.port, config.redis.host, {
//   return_buffers: false,
//   auth_pass: config.redis.options.auth_pass
// });

async function main() {
  try {
    const router = require('./router');
    const port = process.env.PORT || 6601;
    const server = new HTTP({ port });
    server.use('/', router.apiRouter);

    if (ENV !== 'production') {
      server.get('/', (req, res, next) => {
        res.sendFile(`${__dirname}/index.html`);
      });
    }

    const httpServer = server.start();

    const io = socketIo(httpServer, { path: '/moniter/socket.io' });

    io.use(async (socket, next) => {
      try {
        const handshakeData = socket.request;
        const query = handshakeData._query;
        const name = query.name;

        const ser = await serverProxy.findByName({ name });

        if (!ser) {
          return next(new Error('there is no valid server host to monit'));
        }

        const { hosts } = ser;

        handshakeData.hosts = hosts;

        return next();
      } catch (err) {
        return next(err);
      }
    });

    io.on('connection', (socket) => {
      socket.on('disconnect', () => {
        logger.debug('socket disconnect');
      });

      const hosts = socket.request.hosts;
      for (const host of hosts) {
        socket.join(`${host}`);
      }

      io.to('http://localhost:9615').emit('moniter-data', { test: 'hello world' });
    });
  } catch (e) {
    console.log('main error = ', e, e.stack);
    process.exit();
  }
}

main();
