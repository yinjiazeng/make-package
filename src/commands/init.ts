
import * as path from 'path';
import * as fs from 'fs';
import merge from 'lodash.merge';
import { PKG, TEMPLATE_PATH } from '../utils/constant';
import stringify from '../utils/stringify';
import print from '../utils/print';

module.exports = (filePath: string, name: string = '.', options: any) => {
  const pkgDir = path.join(filePath, name);
  const pkg = path.join(pkgDir, PKG);
  const tpkg = path.join(TEMPLATE_PATH, PKG);
  let dirPath = filePath;
  let tjson = {};
  let json = {
    name: path.basename(pkgDir.replace(/\/+$/, '')),
  };

  try {
    tjson = require(tpkg);
  } catch (e) {}

  name.split('/').forEach((dirName) => {
    dirPath = path.join(dirPath, dirName)
    try {
      fs.accessSync(dirPath);
    } catch(e) {
      fs.mkdirSync(dirPath);
    }
  });

  try {
    fs.accessSync(pkg);
    json = { ...json, ...require(pkg) }
  } catch (e) {}

  json = merge(tjson, json);
  const strJson = stringify(json);
  fs.writeFileSync(pkg, strJson);
  print(strJson, options.print);
};;
