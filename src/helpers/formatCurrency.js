/**
 * format currency
 * @ndaidong
 **/

var {
  isNumber
} = require('bellajs');

var formatCurrency = (num) => {
  let n = Number(num);
  if (!n || !isNumber(n) || n < 0) {
    return '0.00';
  }
  return n.toFixed(2).replace(/./g, (c, i, a) => {
    return i && c !== '.' && (a.length - i) % 3 === 0 ? ',' + c : c;
  });
};

module.exports = formatCurrency;
