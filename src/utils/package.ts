import isObject from './isObject';
import merge from 'lodash.merge';

export const set = (data: object, name: string, val: any): object => {
  const json = merge({}, data);
  const keys = name.split('.');
  let obj = json;

  keys.forEach((key, i) => {
    const res = obj[key];
    const childkey = keys[i + 1];

    if (childkey !== undefined) {
      if (!isObject(res)) {
        const isNum = /^\d+$/.test(childkey);
        obj[key] = isNum ? [] : {};
        obj = obj[key];
      } else {
        obj = res;
      }
    } else {
      obj[key] = val;
    }
  });

  return json;
}

export const del = (data: object, name: string): object => {
  const json = merge({}, data);
  const keys = name.split('.');
  const lastIndex = keys.length - 1;
  let obj = json;

  for (let i=0; i<=lastIndex; i++) {
    const key = keys[i];
    const res = obj[key];
    if (res === undefined) {
      break;
    } else if(i === lastIndex) {
      if (Array.isArray(obj) && /^\d+$/.test(key)) {
        obj.splice(Number(key), 1);
      } else {
        delete obj[key];
      }
    } else {
      obj = res;
    }
  }

  return json;
};
