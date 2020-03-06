import * as commander from 'commander';
import pkg from '../package.json';
import execCommand from './utils/execCommand';

const program = new commander.Command();

program.version(pkg.version, '-v, --version', '当前版本');

program
  .command('temp [type] [name] [value]')
  .description('设置模板')
  .option('-a, --array', 'value是数组，以英文","分隔')
  .option('-b, --boolean', 'value是布尔值')
  .option('-n, --number', 'value是数字')
  .action((...args) => {
    execCommand('temp', ...args);
  });

program
  .command('set <name> <value>')
  .description('设置字段')
  .option('-a, --array', 'value是数组，以英文","分隔')
  .option('-b, --boolean', 'value是布尔值')
  .option('-n, --number', 'value是数字')
  .action((...args) => {
    execCommand('set', process.cwd(), ...args);
  });

program
  .command('del <name>')
  .description('删除字段')
  .action((...args) => {
    execCommand('del', process.cwd(), ...args);
  });

program
  .command('init [packageName]')
  .description('根据模板创建package.json')
  .action((...args) => {
    execCommand('init', process.cwd(), ...args);
  });

program.parse(process.argv);
