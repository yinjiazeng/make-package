
import * as path from 'path';
import * as fs from 'fs';
import merge from 'lodash.merge';
import { PKG, TEMPLATE_PATH } from '../utils/constant';
import stringify from '../utils/stringify';
import print from '../utils/print';

module.exports = async (filePath: string, name: string, options: any) => {
  const pkg = path.join(filePath, PKG);
  const tpkg = path.join(TEMPLATE_PATH, PKG);
  let tjson = {};
  let json = { name };

  if (!json.name) {
    json.name = path.basename(filePath.replace(/\/+$/, ''));
  }

  try {
    tjson = require(tpkg);
  } catch (e) {}

  try {
    fs.accessSync(pkg);
    json = { ...json, ...require(pkg) }
  } catch (e) {}

  json = merge(tjson, json);
  const strJson = stringify(json);
  fs.writeFileSync(pkg, strJson);
  print(strJson, options.print);
};;
