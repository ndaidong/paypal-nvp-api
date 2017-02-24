/**
 * Paypal classic API with NVP formatting
 * @ndaidong
 * Refer: https://developer.paypal.com/docs/classic/api/
 **/

var promiseFinally = require('promise.prototype.finally');
promiseFinally.shim();

var bella = require('bellajs');
var request = require('request');

var version = 204;
var liveAPIBase = 'https://api-3t.paypal.com/nvp';
var sandboxAPIBase = 'https://api-3t.sandbox.paypal.com/nvp';

var {
  isString,
  isNumber,
  isArray,
  isObject,
  hasProperty,
  encode,
  decode
} = bella;

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

var parse = (s) => {
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

var formatCurrency = (num) => {
  let n = Number(num);
  if (!n || !isNumber(n) || n < 0) {
    return '0.00';
  }
  return n.toFixed(2).replace(/./g, (c, i, a) => {
    return i && c !== '.' && (a.length - i) % 3 === 0 ? ',' + c : c;
  });
};

var Paypal = (opts = {}) => {

  let {
    mode = 'sandbox',
    username = '',
    password = '',
    signature = ''
  } = opts;

  let baseURL = mode === 'live' ? liveAPIBase : sandboxAPIBase;

  let payload = {
    USER: username,
    PWD: password,
    SIGNATURE: signature,
    VERSION: version
  };

  let sendRequest = (method, params) => {
    let pr = params || {};
    let o = bella.copies(payload, pr);
    o.METHOD = method;
    return new Promise((resolve, reject) => {
      return request.post({
        url: baseURL,
        headers: {
          'X-PAYPAL-SECURITY-USERID': o.USER,
          'X-PAYPAL-SECURITY-PASSWORD': o.PWD,
          'X-PAYPAL-SECURITY-SIGNATURE': o.SIGNATURE,
          'X-PAYPAL-RESPONSE-DATA-FORMAT': 'JSON'
        },
        body: stringify(pr)
      }, (err, response, body) => {
        if (err) {
          return reject(err);
        }
        let r = parse(body);
        return resolve(r);
      });
    });
  };
  return {
    request: sendRequest,
    formatCurrency
  };
};

module.exports = Paypal;
