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

const {
  isObject,
  copies,
} = require('bellajs');

const fetch = require('node-fetch');

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

  const sendRequest = async (method, params = {}) => {
    if (!isObject(params)) {
      return new Error('Params must be an object');
    }

    try {
      const query = copies(payload, params);
      query.METHOD = method;

      const res = await fetch(baseURL, {
        method: 'POST',
        headers: {
          'X-PAYPAL-SECURITY-USERID': query.USER,
          'X-PAYPAL-SECURITY-PASSWORD': query.PWD,
          'X-PAYPAL-SECURITY-SIGNATURE': query.SIGNATURE,
          'X-PAYPAL-RESPONSE-DATA-FORMAT': 'JSON',
        },
        body: stringify(query),
      });
      if (!res.ok) {
        return new Error(`Error: Response error with code: ${res.statusText}`);
      }
      const data = await res.text();
      return parse(data);
    } catch (err) {
      return err;
    }
  };

  return {
    request: sendRequest,
    formatCurrency,
  };
};

module.exports = Paypal;

