
import * as path from 'path';
import { PKG } from '../utils/constant';
import checkFileExist from '../utils/checkFileExist';
import writeFile from '../utils/writeFile';
import stringify from '../utils/stringify';
import isObject from '../utils/isObject';
import print from '../utils/print';

module.exports = async (filePath: string, name: string, value: any, options: any) => {
  const pkg = path.join(filePath, PKG);

  try {
    await checkFileExist(pkg);
  } catch (e) {
    await writeFile(pkg, '{}');
  }

  const json = require(pkg);
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

  let obj = json;
  const keys = name.split('.');
  const lastIndex = keys.length - 1;

  keys.forEach((key, i) => {
    const res = obj[key];
    const childkey = keys[i + 1];

    if (childkey !== undefined) {
      if (!isObject(res)) {
        const isNum = /^\d+$/.test(childkey);
        obj[key] = isNum ? [] : {};
        obj = obj[key];
      } else {
        obj = res;
      }
    } else {
      obj[key] = val;
    }
  });

  const strJson = stringify(json);

  await writeFile(pkg, strJson);

  print(strJson, options.print);
};;
