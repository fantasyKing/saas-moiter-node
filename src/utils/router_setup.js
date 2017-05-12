/**
 * Created on 5/6/16.
 */
import express from 'express';

import paramsParser from './params_parser';
import checkParamType from './check_params_type';

function handler(route) {
  return (req, res, next) => {
    try {
      const params = Object.assign({}, req.params);
      const { error, newParams } = checkParamType(params, route[4], route[5], route[6]);

      if (error.length) {
        return res.send({ code: 0, message: error.join(',') });
      }
      return route[3](req, res, newParams);
    } catch (err) {
      logger.error('router handler error', err);
      return res.json({ code: 0, message: 'request fail' });
    }
  };
}
/**
routes = {
  passport: [
    [method, route, [middlewares], handler, [params], [params_options], [params_types]]
  ]
}
 */
export default function (router, routes) {
  for (const key of Object.keys(routes)) {
    const elements = routes[key];
    const subRouter = express.Router();
    for (const element of elements) {
      const method = element[0].toLowerCase();
      subRouter[method](`${element[1]}`, paramsParser.json, element[2], handler(element));
    }
    router.use(`/${key}`, subRouter);
  }
}
