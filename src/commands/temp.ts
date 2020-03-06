
import * as path from 'path';
import { TEMPLATE_PATH, PKG } from '../utils/constant';
import checkFileExist from '../utils/checkFileExist';
import writeFile from '../utils/writeFile';
import execCommand from '../utils/execCommand';

module.exports = async (type?: string, ...args: any) => {
  const pkg = path.join(TEMPLATE_PATH, PKG);

  try {
    await checkFileExist(pkg);
  } catch (e) {
    await writeFile(pkg, '{}');
  }

  if (type === undefined) {
    console.log();
    console.log(require(pkg));
    console.log();
  } else if (type === 'set') {
    execCommand('set', TEMPLATE_PATH, ...args);
  } else if (type === 'del') {
    execCommand('del', TEMPLATE_PATH, ...args);
  }
};;
