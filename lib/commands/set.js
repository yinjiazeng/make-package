"use strict";

var path = _interopRequireWildcard(require("path"));

var _constant = require("../utils/constant");

var _checkFileExist = _interopRequireDefault(require("../utils/checkFileExist"));

var _writeFile = _interopRequireDefault(require("../utils/writeFile"));

var _stringify = _interopRequireDefault(require("../utils/stringify"));

var _isObject = _interopRequireDefault(require("../utils/isObject"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

module.exports = async (filePath, name, value, options) => {
  const pkg = path.join(filePath, _constant.PKG);

  try {
    await (0, _checkFileExist.default)(pkg);
  } catch (e) {
    await (0, _writeFile.default)(pkg, '{}');
  }

  const json = require(pkg);

  let val = value;

  if (options.array) {
    val = val.split(',');
  } else if (options.boolean) {
    if (val === "true") {
      val = true;
    } else if (val === "false") {
      val = false;
    }
  } else if (options.number && !isNaN(val)) {
    val = parseFloat(val);
  }

  let obj = json;
  const attrs = name.split('.');
  const lastIndex = attrs.length - 1;
  attrs.forEach((attr, i) => {
    if (!(0, _isObject.default)(obj[attr])) {
      obj[attr] = {};
    }

    if (lastIndex === i) {
      obj[attr] = val;
    } else {
      obj = obj[attr];
    }
  });
  await (0, _writeFile.default)(pkg, (0, _stringify.default)(json));
};

;