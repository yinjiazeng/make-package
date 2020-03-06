"use strict";

var path = _interopRequireWildcard(require("path"));

var _constant = require("../utils/constant");

var _checkFileExist = _interopRequireDefault(require("../utils/checkFileExist"));

var _writeFile = _interopRequireDefault(require("../utils/writeFile"));

var _stringify = _interopRequireDefault(require("../utils/stringify"));

var _print = _interopRequireDefault(require("../utils/print"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

module.exports = async (filePath, name, options) => {
  const pkg = path.join(filePath, _constant.PKG);

  try {
    await (0, _checkFileExist.default)(pkg);
  } catch (e) {}

  const json = require(pkg);

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

  const strJson = (0, _stringify.default)(json);
  await (0, _writeFile.default)(pkg, strJson);
  (0, _print.default)(strJson, options.print);
};

;