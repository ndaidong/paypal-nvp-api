/**
 * parse data returned by Paypal to normal object
 * @ndaidong
 **/

const {
  decode,
} = require('bellajs');

const parse = (s) => {
  let d = {};
  let a = s.split('&');
  if (a.length > 0) {
    a.forEach((item) => {
      let b = item.split('=');
      if (b.length === 2) {
        d[b[0]] = decode(b[1]);
      }
    });
  }
  return d;
};

module.exports = parse;

