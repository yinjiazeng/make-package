
import * as path from 'path';
import { PKG } from '../utils/constant';
import checkFileExist from '../utils/checkFileExist';
import writeFile from '../utils/writeFile';
import stringify from '../utils/stringify';
import print from '../utils/print';

module.exports = async (filePath: string, name: string, options: any) => {
  const pkg = path.join(filePath, PKG);

  try {
    await checkFileExist(pkg);
  } catch (e) {}

  const json = require(pkg);
  const keys = name.split('.');
  const lastIndex = keys.length - 1;
  let obj = json;

  for (let i=0; i<=lastIndex; i++) {
    const key = keys[i];
    const res = obj[key];
    if (res === undefined) {
      break;
    } else if(i === lastIndex) {
      if (Array.isArray(obj) && /^\d+$/.test(key)) {
        obj.splice(Number(key), 1);
      } else {
        delete obj[key];
      }
    } else {
      obj = res;
    }
  }

  const strJson = stringify(json);

  await writeFile(pkg, strJson);

  print(strJson, options.print);
};;
