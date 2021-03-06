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

  async updateServer(params) {
    try {
      const { id, name, hosts, weight } = params;

      for (const host of hosts) {
        if (!urlResolver.isURL(host)) {
          throw new Error(`invalid host ${host}`);
        }
      }

      const result = await ServerModel.update({
        _id: id
      }, {
        name,
        hosts,
        weight
      }).exec();
      if (result.ok === 1) {
        return true;
      }
      return false;
    } catch (err) {
      logger.error('controller.server.updateServer.error', err);
      throw err;
    }
  }

  async deleteServer(params) {
    try {
      const { id } = params;

      const result = await ServerModel.remove({ _id: id });

      if (result.ok === 1) {
        return true;
      }
      return false;
    } catch (err) {
      logger.error('controller.server.deleteServer.error', err);
      throw err;
    }
  }

  async getById(params) {
    try {
      const { id } = params;

      const result = await ServerModel.findOne({ _id: id }).exec();

      if (!result) {
        throw new Error(`not found ${id}`);
      }
      return result.obj();
    } catch (err) {
      logger.error('controller.server.getById.error', err);
      throw err;
    }
  }
};
