"use strict";

var commander = _interopRequireWildcard(require("commander"));

var _package = _interopRequireDefault(require("../package.json"));

var _execCommand = _interopRequireDefault(require("./utils/execCommand"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const program = new commander.Command();
program.version(_package.default.version, '-v, --version', '当前版本');
program.command('temp [type] [name] [value]').description('设置模板').action((...args) => {
  (0, _execCommand.default)('temp', ...args);
});
program.command('set <name> <value>').description('设置字段').option('-a, --array', 'value是数组，以英文","分隔').option('-b, --boolean', 'value是布尔值').option('-n, --number', 'value是数字').action((...args) => {
  (0, _execCommand.default)('set', process.cwd(), ...args);
});
program.command('del <name>').description('删除字段').action((...args) => {
  (0, _execCommand.default)('del', process.cwd(), ...args);
});
program.command('init [packageName]').description('根据模板创建package.json').action((...args) => {
  (0, _execCommand.default)('init', process.cwd(), ...args);
});
program.parse(process.argv);