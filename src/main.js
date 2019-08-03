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

global.Promise = require('promise-wtf');

const {
  isObject,
  copies,
} = require('bellajs');

const request = require('request');

const {
  stringify,
  parse,
  formatCurrency,
} = require('./helpers');

const Paypal = (opts = {}) => {
  const {
    mode = 'sandbox',
    username = '',
    password = '',
    signature = '',
  } = opts;

  const baseURL = mode === 'live' ? BASE_API_LIVE : BASE_API_SANDBOX;
  opts.track = mode === 'live' ? TRACKING_URL_LIVE : TRACKING_URL_SANDBOX;

  const payload = {
    USER: username,
    PWD: password,
    SIGNATURE: signature,
    VERSION,
  };

  const sendRequest = (method, params = {}) => {
    return new Promise((resolve, reject) => {
      if (!isObject(params)) {
        return reject(new Error('Params must be an object'));
      }

      const o = copies(payload, params);
      o.METHOD = method;

      return request.post({
        url: baseURL,
        headers: {
          'X-PAYPAL-SECURITY-USERID': o.USER,
          'X-PAYPAL-SECURITY-PASSWORD': o.PWD,
          'X-PAYPAL-SECURITY-SIGNATURE': o.SIGNATURE,
          'X-PAYPAL-RESPONSE-DATA-FORMAT': 'JSON',
        },
        body: stringify(params),
      }, (err, response, body) => {
        if (err) {
          return reject(err);
        }
        const {
          statusCode,
        } = response;
        if (statusCode !== 200) {
          return reject(new Error(`Error: Response error with code: ${statusCode}`));
        }
        const r = parse(body);
        return resolve(r);
      });
    });
  };
  return {
    request: sendRequest,
    formatCurrency,
  };
};

module.exports = Paypal;

