import validator from 'validator';

const DefaultValue = { array: [], number: 0 };
// 检查必须的参数是否存在
function mustExists(must, value) {
  if (must && (value === undefined || value === null)) {
    return false;
  }
  return true;
}
function isNullNotZero(val) {
  if (val === undefined || val === '' || val === null) return true;
  return false;
}

// 检查参数类型是否正确，escapse字符串，将json转成对象
function isValidType(obj, value, attr, type) {
  if (!Array.isArray(value) && !(toString.call(value) === '[object Object]')) {
    value = String(value); // validator参数必须为字符串
  }
  const trim = (str = '') => {
    if (typeof str !== 'string') return '';
    const result = str.replace(/(^\s*)|(\s*$)/g, '');
    return result;
  };
  const types = type.split(',');
  for (const type_value of types) {
    const _type = trim(type_value).toLowerCase();
    switch (_type) {
      case 'array': {
        if (Array.isArray(value)) {
          return true;
        }
        break;
      }
      case 'mongoid': {
        if (validator.isMongoId(value)) {
          return true;
        }
        break;
      }
      case 'date': {
        if (validator.isDate(value)) {
          return true;
        }
        break;
      }
      case 'phone': {
        if (value) {
          return true;
        }
        break;
      }
      case 'number': {
        if (validator.isNumeric(value)) {
          obj[attr] = Number.parseInt(value);
          return true;
        }
        break;
      }
      case 'float': {
        if (validator.isFloat(value)) {
          obj[attr] = Number.parseFloat(value);
          return true;
        }
        break;
      }
      case 'decimal': {
        if (validator.isDecimal(value)) {
          return true;
        }
        break;
      }
      case 'email': {
        if (validator.isEmail(value)) {
          return true;
        }
        break;
      }
      case 'file': {
        if (value) {
          return true;
        }
        break;
      }
      case 'json': {
        if (toString.call(value) === '[object Object]') {
          obj[attr] = value;
          return true;
        }
        if (toString.call(value) === '[object String]' && validator.isJSON(value)) {
          obj[attr] = JSON.parse(value);
          return true;
        }
        break;
      }
      default : {
        if (typeof value === _type) {
          return true;
        }
        break;
      }
    }
  }
  return false;
}

export default function (obj, attrs, musts, types) {
  const err = [];
  // 校验参数必须是不为空的数组
  if (!attrs || !musts || !types) {
    return { error: err };
  }
  // 校验参数数组必须长度保持一致
  if (!(attrs.length === musts.length && attrs.length === types.length)) {
    err.push('attrs, musts and types length must be equivalent.');
    return { error: err };
  }
  const len = attrs.length;
  const new_obj = [];
  for (let i = 0; i < len; i ++) {
    const key = attrs[i];
    const must = musts[i];
    const type = types[i];
    let value = obj[key];
    const defaultValue = DefaultValue[type];
    if (Boolean(defaultValue) && !Boolean(value)) {
      new_obj[key] = defaultValue;
      value = defaultValue;
    }
    if (!mustExists(must, value)) {
      err.push(`${key} is necessary`);
    }
    if (!must && isNullNotZero(value)) continue;
    if (!isValidType(obj, value, key, type)) {
      err.push(`${key} should be ${type}`);
    }
  }
  return { error: err, newParams: Object.assign(obj, new_obj) };
}
