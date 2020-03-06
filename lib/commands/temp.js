"use strict";

var path = _interopRequireWildcard(require("path"));

var _constant = require("../utils/constant");

var _checkFileExist = _interopRequireDefault(require("../utils/checkFileExist"));

var _writeFile = _interopRequireDefault(require("../utils/writeFile"));

var _execCommand = _interopRequireDefault(require("../utils/execCommand"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

module.exports = async (type, ...args) => {
  const pkg = path.join(_constant.TEMPLATE_PATH, _constant.PKG);

  try {
    await (0, _checkFileExist.default)(pkg);
  } catch (e) {
    await (0, _writeFile.default)(pkg, '{}');
  }

  if (type === undefined) {
    console.log();
    console.log(require(pkg));
    console.log();
  } else if (type === 'set') {
    (0, _execCommand.default)('set', _constant.TEMPLATE_PATH, ...args);
  } else if (type === 'del') {
    (0, _execCommand.default)('del', _constant.TEMPLATE_PATH, ...args);
  }
};

;