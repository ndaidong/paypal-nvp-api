/**
 * parse data returned by Paypal to normal object
 * @ndaidong
 **/

const parse = (s) => {
  const d = {};
  const a = s.split('&');
  if (a.length > 0) {
    a.forEach((item) => {
      const b = item.split('=');
      if (b.length === 2) {
        d[b[0]] = decodeURIComponent(b[1]);
      }
    });
  }
  return d;
};

module.exports = parse;

