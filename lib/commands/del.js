"use strict";

var path = _interopRequireWildcard(require("path"));

var fs = _interopRequireWildcard(require("fs"));

var _constant = require("../utils/constant");

var _stringify = _interopRequireDefault(require("../utils/stringify"));

var _print = _interopRequireDefault(require("../utils/print"));

var _package = require("../utils/package");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

module.exports = (filePath, name, options) => {
  const pkg = path.join(filePath, _constant.PKG);

  try {
    fs.accessSync(pkg);

    if (name) {
      const json = (0, _package.del)(require(pkg), name);
      const strJson = (0, _stringify.default)(json);
      fs.writeFileSync(pkg, strJson);
      (0, _print.default)(strJson, options.print);
    }
  } catch (e) {}
};

;