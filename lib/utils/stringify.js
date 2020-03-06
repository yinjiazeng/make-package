"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = json => {
  return JSON.stringify(json, null, '\t');
};

exports.default = _default;