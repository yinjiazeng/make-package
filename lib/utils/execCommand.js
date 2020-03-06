"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = (type, ...args) => {
  require(`../commands/${type}`)(...args);
};

exports.default = _default;