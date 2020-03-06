import * as fs from 'fs';

export default (url: string) =>
  new Promise((res, rej) => {
    fs.access(url, (err) => {
      if (!err) {
        res();
      } else {
        rej(err);
      }
    });
  })
