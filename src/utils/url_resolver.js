import url from 'url';
import validator from 'validator';

const DEFAULTOP = { protocols: ['http'], require_protocol: true };

export default new class {
  isURL(urlPath, options) {
    options = options || {};
    const op = Object.assign(DEFAULTOP, options);

    return validator.isURL(urlPath, op);
  }

  resolve(urlPath) {
    return url.parse(urlPath);
  }
};
