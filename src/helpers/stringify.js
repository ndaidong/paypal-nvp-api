/**
 * convert array or object to query string
 * @ndaidong
 **/

var {
  isString,
  isArray,
  isObject,
  hasProperty,
  encode
} = require('bellajs');

var stringify = (data) => {
  let s = '';
  if (isString(data)) {
    s = data;
  } else if (isArray(data) || isObject(data)) {
    let ar = [];
    for (let k in data) {
      if (hasProperty(data, k)) {
        let val = data[k];
        if (isString(val)) {
          val = encode(val);
        } else if (isArray(val) || isObject(val)) {
          val = JSON.stringify(val);
        }
        ar.push(encode(k) + '=' + val);
      }

    }
    if (ar.length > 0) {
      s = ar.join('&');
    }
  }
  return s;
};

module.exports = stringify;
