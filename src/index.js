/**
 * Created on 5/5/16.
 */
import simpleLogger from 'simple-logger';

import HTTP from './server/http';
import config from './config';

const logger = simpleLogger.getLogger(config.logger.category);
logger.setLevel(config.logger.level);


async function main() {
  try {
    const router = require('./router');
    const port = process.env.PORT || 4040;
    const server = new HTTP({ port });
    server.use('/', router.rootRouter);
    server.start();
  } catch (e) {
    console.log('main error = ', e, e.stack);
    process.exit();
  }
}

main();
