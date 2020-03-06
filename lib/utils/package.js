"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.del = exports.set = void 0;

var _isObject = _interopRequireDefault(require("./isObject"));

var _lodash = _interopRequireDefault(require("lodash.merge"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const set = (data, name, val) => {
  const json = (0, _lodash.default)({}, data);
  const keys = name.split('.');
  let obj = json;
  keys.forEach((key, i) => {
    const res = obj[key];
    const childkey = keys[i + 1];

    if (childkey !== undefined) {
      if (!(0, _isObject.default)(res)) {
        const isNum = /^\d+$/.test(childkey);
        obj[key] = isNum ? [] : {};
        obj = obj[key];
      } else {
        obj = res;
      }
    } else {
      obj[key] = val;
    }
  });
  return json;
};

exports.set = set;

const del = (data, name) => {
  const json = (0, _lodash.default)({}, data);
  const keys = name.split('.');
  const lastIndex = keys.length - 1;
  let obj = json;

  for (let i = 0; i <= lastIndex; i++) {
    const key = keys[i];
    const res = obj[key];

    if (res === undefined) {
      break;
    } else if (i === lastIndex) {
      if (Array.isArray(obj) && /^\d+$/.test(key)) {
        obj.splice(Number(key), 1);
      } else {
        delete obj[key];
      }
    } else {
      obj = res;
    }
  }

  return json;
};

exports.del = del;