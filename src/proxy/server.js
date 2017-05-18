import models from './../mongo/';

const ServerModel = models.Server;

export default new class {
  async findAll() {
    try {
      const result = await ServerModel.find({}).exec();
      const formatRes = [];

      for (const res of result) {
        formatRes.push(res.obj());
      }

      return formatRes;
    } catch (err) {
      logger.error('proxy.server.find.error', err);
      throw err;
    }
  }

  async findByName(params) {
    try {
      const { name } = params;
      const result = await ServerModel.findOne({ name });
      return result ? result.obj() : null;
    } catch (err) {
      logger.error('proxy.server.findByName.error', err);
      throw err;
    }
  }
};
