
import * as path from 'path';
import { PKG } from '../utils/constant';
import checkFileExist from '../utils/checkFileExist';
import writeFile from '../utils/writeFile';
import stringify from '../utils/stringify';
import isObject from '../utils/isObject';

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
  const attrs = name.split('.');
  const lastIndex = attrs.length - 1;
  attrs.forEach((attr, i) => {
    if (!isObject(obj[attr])) {
      obj[attr] = {};
    }
    if (lastIndex === i) {
      obj[attr] = val;
    } else {
      obj = obj[attr];
    }
  });

  await writeFile(pkg, stringify(json));
};;
