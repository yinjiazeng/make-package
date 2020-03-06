
import * as path from 'path';
import { PKG } from '../utils/constant';
import checkFileExist from '../utils/checkFileExist';
import writeFile from '../utils/writeFile';
import stringify from '../utils/stringify';
import print from '../utils/print';
import { set } from '../utils/package';

module.exports = async (filePath: string, name: string, value: any, options: any) => {
  const pkg = path.join(filePath, PKG);

  try {
    await checkFileExist(pkg);
  } catch (e) {
    await writeFile(pkg, '{}');
  }

  let json = require(pkg);
  let val = value;

  if (options.array) {
    val = val.split(',');
  } else if (options.boolean) {
    if (val === "true") {
      val = true;
    } else if (val === "false") {
      val = false;
    }
  } else if (options.number && !isNaN(val)) {
    val = parseFloat(val);
  }

  json = set(json, name, val);

  const strJson = stringify(json);

  await writeFile(pkg, strJson);

  print(strJson, options.print);
};;
