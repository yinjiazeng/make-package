
import * as path from 'path';
import { PKG } from '../utils/constant';
import checkFileExist from '../utils/checkFileExist';
import writeFile from '../utils/writeFile';
import stringify from '../utils/stringify';
import print from '../utils/print';

module.exports = async (filePath: string, options: any) => {
  const pkg = path.join(filePath, PKG);

  try {
    await checkFileExist(pkg);
  } catch (e) {}

  const strJson = stringify({});

  await writeFile(pkg, strJson);

  print(strJson, options.print);
};;
