/**
 * format currency
 * @ndaidong
 **/

const {
  isNumber,
} = require('bellajs');

const formatCurrency = (num) => {
  const n = Number(num);
  if (!n || !isNumber(n) || n < 0) {
    return '0.00';
  }
  return n.toFixed(2).replace(/./g, (c, i, a) => {
    return i && c !== '.' && (a.length - i) % 3 === 0 ? ',' + c : c;
  });
};

module.exports = formatCurrency;
