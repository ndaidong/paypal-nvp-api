/**
 * convert array or object to query string
 * @ndaidong
 **/

const {
  isString,
  isArray,
  isObject,
  hasProperty,
} = require('bellajs');

const stringify = (data) => {
  let s = '';
  if (isString(data)) {
    s = data;
  } else if (isArray(data) || isObject(data)) {
    const ar = [];
    for (const k in data) {
      if (hasProperty(data, k)) {
        let val = data[k];
        if (isString(val)) {
          val = encodeURIComponent(val);
        } else if (isArray(val) || isObject(val)) {
          val = JSON.stringify(val);
        }
        ar.push(encodeURIComponent(k) + '=' + val);
      }
    }
    if (ar.length > 0) {
      s = ar.join('&');
    }
  }
  return s;
};

module.exports = stringify;

