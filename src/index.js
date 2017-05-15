/**
 * Created on 5/5/16.
 */
import simpleLogger from 'simple-logger';

import HTTP from './server/http';
import config from './config';

const logger = simpleLogger.getLogger(config.logger.category);
logger.setLevel(config.logger.level);

global.logger = logger;


async function main() {
  try {
    const router = require('./router');
    const port = process.env.PORT || 6601;
    const server = new HTTP({ port });
    server.use('/', router.apiRouter);
    server.start();
  } catch (e) {
    console.log('main error = ', e, e.stack);
    process.exit();
  }
}

main();
