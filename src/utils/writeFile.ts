import * as fs from 'fs';

export default (url: string, content: string) =>
  new Promise((res, rej) => {
    fs.writeFile(url, content, (err) => {
      if (!err) {
        res();
      } else {
        rej(err);
      }
    });
  })
