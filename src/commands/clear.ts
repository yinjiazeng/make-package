
import * as path from 'path';
import * as fs from 'fs';
import { PKG } from '../utils/constant';
import stringify from '../utils/stringify';
import print from '../utils/print';

module.exports = (filePath: string, options: any) => {
  const pkg = path.join(filePath, PKG);

  try {
    fs.accessSync(pkg);
    const strJson = stringify({});
    fs.writeFileSync(pkg, strJson);
    print(strJson, options.print);
  } catch (e) {}
};;
