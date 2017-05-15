import models from './../mongo/';

const ServerModel = models.Server;

export default new class {
  async addServer(params) {
    try {
      const { name, hosts, weight } = params;

      const result = await ServerModel.create({
        name,
        hosts,
        weight
      });
      if (!result) {
        throw new Error('create server moniter fail');
      }

      return result;
    } catch (err) {
      logger.error('controller.server.addServer.error', err);
      throw err;
    }
  }
};
