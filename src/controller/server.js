import models from './../mongo/';
import urlResolver from './../utils/url_resolver';

const ServerModel = models.Server;

export default new class {
  async addServer(params) {
    try {
      const { name, hosts, weight } = params;

      for (const host of hosts) {
        if (!urlResolver.isURL(host)) {
          throw new Error(`invalid host ${host}`);
        }
      }

      const result = await ServerModel.create({
        name,
        hosts,
        weight
      });
      if (!result) {
        throw new Error('create server moniter fail');
      }

      return result.obj();
    } catch (err) {
      logger.error('controller.server.addServer.error', err);
      throw err;
    }
  }
};
