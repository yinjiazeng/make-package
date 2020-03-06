
import * as path from 'path';
import * as fs from 'fs';
import { TEMPLATE_PATH, PKG } from '../utils/constant';
import execCommand from '../utils/execCommand';
import print from '../utils/print';
import stringify from '../utils/stringify';

module.exports = (type?: string, ...args: any) => {
  const pkg = path.join(TEMPLATE_PATH, PKG);

  try {
    fs.accessSync(pkg);
  } catch (e) {
    fs.mkdirSync(TEMPLATE_PATH);
    fs.writeFileSync(pkg, '{}');
  }

  if (type === undefined) {
    print(stringify(require(pkg)), true);
  } else if (['set', 'del', 'clear'].includes(type)) {
    execCommand(type, TEMPLATE_PATH, ...args);
  }
};;
