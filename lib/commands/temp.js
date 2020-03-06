"use strict";

var path = _interopRequireWildcard(require("path"));

var fs = _interopRequireWildcard(require("fs"));

var _constant = require("../utils/constant");

var _execCommand = _interopRequireDefault(require("../utils/execCommand"));

var _print = _interopRequireDefault(require("../utils/print"));

var _stringify = _interopRequireDefault(require("../utils/stringify"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

module.exports = (type, ...args) => {
  const pkg = path.join(_constant.TEMPLATE_PATH, _constant.PKG);

  try {
    fs.accessSync(pkg);
  } catch (e) {
    fs.mkdirSync(_constant.TEMPLATE_PATH);
    fs.writeFileSync(pkg, '{}');
  }

  if (type === undefined) {
    (0, _print.default)((0, _stringify.default)(require(pkg)), true);
  } else if (['set', 'del', 'clear'].includes(type)) {
    (0, _execCommand.default)(type, _constant.TEMPLATE_PATH, ...args);
  }
};

;