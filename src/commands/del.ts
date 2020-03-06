
import * as path from 'path';
import { PKG } from '../utils/constant';
import checkFileExist from '../utils/checkFileExist';
import writeFile from '../utils/writeFile';
import stringify from '../utils/stringify';
import print from '../utils/print';
import { del } from '../utils/package';

module.exports = async (filePath: string, name: string, options: any) => {
  const pkg = path.join(filePath, PKG);

  try {
    await checkFileExist(pkg);
  } catch (e) {}

  const json = del(require(pkg), name);

  const strJson = stringify(json);

  await writeFile(pkg, strJson);

  print(strJson, options.print);
};;
