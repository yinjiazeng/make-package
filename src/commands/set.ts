
import * as path from 'path';
import * as fs from 'fs';
import { PKG } from '../utils/constant';
import stringify from '../utils/stringify';
import print from '../utils/print';
import { set } from '../utils/package';

module.exports = (filePath: string, name: string, value: any, options: any) => {
  const pkg = path.join(filePath, PKG);

  try {
    fs.accessSync(pkg);
  } catch (e) {
    fs.writeFileSync(pkg, '{}');
  }

  if (name) {
    let json = require(pkg);
    let val = value;

    if (options.array) {
      val = val ? val.split(',') : [];
    } else if (options.boolean) {
      if (val === 'true') {
        val = true;
      } else if (val === 'false') {
        val = false;
      }
    } else if (options.number && !isNaN(val)) {
      val = parseFloat(val);
    }

    json = set(json, name, val);

    const strJson = stringify(json);

    fs.writeFileSync(pkg, strJson);

    print(strJson, options.print);
  }
};;
