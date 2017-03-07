/**
 * Paypal classic API with NVP formatting
 * @ndaidong
 * Refer: https://developer.paypal.com/docs/classic/api/
 **/

const VERSION = 204;
const BASE_API_LIVE = 'https://api-3t.paypal.com/nvp';
const BASE_API_SANDBOX = 'https://api-3t.sandbox.paypal.com/nvp';
const TRACKING_URL_LIVE = 'https://www.paypal.com';
const TRACKING_URL_SANDBOX = 'https://www.sandbox.paypal.com';

var promiseFinally = require('promise.prototype.finally');
promiseFinally.shim();

var bella = require('bellajs');
var request = require('request');

var {
  stringify,
  parse,
  formatCurrency
} = require('./helpers');

var Paypal = (opts = {}) => {

  let {
    mode = 'sandbox',
    username = '',
    password = '',
    signature = ''
  } = opts;

  let baseURL = mode === 'live' ? BASE_API_LIVE : BASE_API_SANDBOX;
  opts.track = mode === 'live' ? TRACKING_URL_LIVE : TRACKING_URL_SANDBOX;

  let payload = {
    USER: username,
    PWD: password,
    SIGNATURE: signature,
    VERSION
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
