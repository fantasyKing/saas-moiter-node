import Base from './../base';

import serverCtrl from './../../../controller/server';

export default new class extends Base {

  /**
   * 创建监控的server
   * @method POST
   * @url /server/add
   * @param req
   * @param res
   * @param params { name, hosts, weight }
   * @return {}
   */
  server10000 = async (req, res, params) => {
    try {
      const result = await serverCtrl.addServer(params);
      return this.ok(res, result);
    } catch (err) {
      return this.fail(res)(err);
    }
  }
};
