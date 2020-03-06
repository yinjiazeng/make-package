
import * as path from 'path';
import merge from 'lodash.merge';
import { PKG, TEMPLATE_PATH } from '../utils/constant';
import checkFileExist from '../utils/checkFileExist';
import writeFile from '../utils/writeFile';
import stringify from '../utils/stringify';

module.exports = async (filePath: string, name: string) => {
  const pkg = path.join(filePath, PKG);
  const tpkg = path.join(TEMPLATE_PATH, PKG);
  const tjson = require(tpkg);
  let json = { name };

  if (!json.name) {
    json.name = path.basename(filePath.replace(/\/+$/, ''));
  }

  try {
    await checkFileExist(pkg);
    json = { ...json, ...require(pkg) }
  } catch (e) {

  }

  json = merge({ ...tjson, ...json });

  await writeFile(pkg, stringify(json));
};;