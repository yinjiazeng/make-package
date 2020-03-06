
import * as path from 'path';
import * as fs from 'fs';
import { PKG } from '../utils/constant';
import stringify from '../utils/stringify';
import print from '../utils/print';
import { del } from '../utils/package';

module.exports = async (filePath: string, name: string, options: any) => {
  const pkg = path.join(filePath, PKG);

  try {
    fs.accessSync(pkg);
    if (name) {
      const json = del(require(pkg), name);
      const strJson = stringify(json);
      fs.writeFileSync(pkg, strJson);
      print(strJson, options.print);
    }
  } catch (e) {}
};;
