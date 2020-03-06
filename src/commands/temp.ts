
import * as path from 'path';
import { TEMPLATE_PATH, PKG } from '../utils/constant';
import checkFileExist from '../utils/checkFileExist';
import writeFile from '../utils/writeFile';
import execCommand from '../utils/execCommand';
import print from '../utils/print';
import stringify from '../utils/stringify';

module.exports = async (type?: string, ...args: any) => {
  const pkg = path.join(TEMPLATE_PATH, PKG);

  try {
    await checkFileExist(pkg);
  } catch (e) {
    await writeFile(pkg, '{}');
  }

  if (type === undefined) {
    print(stringify(require(pkg)), true);
  } else if (['set', 'del', 'clear'].includes(type)) {
    execCommand(type, TEMPLATE_PATH, ...args);
  }
};;
