
import * as path from 'path';
import { PKG } from '../utils/constant';
import checkFileExist from '../utils/checkFileExist';
import writeFile from '../utils/writeFile';
import stringify from '../utils/stringify';

module.exports = async (filePath: string, name: string) => {
  const pkg = path.join(filePath, PKG);

  try {
    await checkFileExist(pkg);
  } catch (e) {
    throw e;
  }

  const json = require(pkg);
  const attrs = name.split('.');
  const lastIndex = attrs.length - 1;
  let obj = json;

  for (let i=0; i<=lastIndex; i++) {
    const attr = attrs[i];
    if (obj[attr] === undefined) {
      break;
    } else if(i === lastIndex) {
      delete obj[attr];
    } else {
      obj = obj[attr];
    }
  }

  await writeFile(pkg, stringify(json));
};;
