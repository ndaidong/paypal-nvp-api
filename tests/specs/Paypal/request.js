/**
 * Testing
 * @ndaidong
 */

/* eslint-disable no-console */

const test = require('tap').test;
const nock = require('nock');

const {
  isObject,
  hasProperty,
} = require('bellajs');

const config = require('../config');

const nvp = config.main;
const paypal = nvp(config);

const hasRequiredKey = (o, k) => {
  return hasProperty(o, k);
};

test('.GetBalance()', async (assert) => {
  const props = [
    'L_AMT0',
    'L_CURRENCYCODE0',
    'TIMESTAMP',
    'CORRELATIONID',
    'ACK',
    'VERSION',
    'BUILD',
  ];

  const re = await paypal.request('GetBalance', {});
  assert.ok(isObject(re), 'Result should be an object');
  props.forEach((k) => {
    assert.ok(hasRequiredKey(re, k), `Result must have the required property "${k}"`);
  });
  assert.end();
});

test('.SetExpressCheckout()', async (assert) => {
  const query = {
    PAYMENTREQUEST_0_AMT: '20.00',
    PAYMENTREQUEST_0_CURRENCYCODE: 'USD',
    PAYMENTREQUEST_0_PAYMENTACTION: 'Sale',
    RETURNURL: 'http://google.com/test/onreturn',
    CANCELURL: 'http://google.com/test/oncancel',
  };

  const props = [
    'TOKEN',
    'TIMESTAMP',
    'CORRELATIONID',
    'ACK',
    'VERSION',
    'BUILD',
  ];

  const re = await paypal.request('SetExpressCheckout', query);
  assert.ok(isObject(re), 'Result should be an object');
  props.forEach((k) => {
    assert.ok(hasRequiredKey(re, k), `Result must have the required property "${k}"`);
  });
  assert.end();
});


test('Call a unexist method', async (assert) => {
  const re = await paypal.request('CallUnexistMethod', {});
  assert.ok(isObject(re), 'Result should be an object');
  assert.equals(re.ACK, 'Failure', `Response's properry "ACK" must be an error`);
  assert.end();
});

test('Call with invalid params', async (assert) => {
  try {
    await paypal.request('GetBalance', 'noop');
  } catch (e) {
    const emsg = 'Error: Params must be an object';
    assert.equals(e.message, emsg, `It must throw: "${emsg}"`);
  } finally {
    assert.end();
  }
});

test('Call with instance initialized from the bad configs', async (assert) => {
  const fakePaypal = nvp();
  const re = await fakePaypal.request('GetBalance', {});
  assert.ok(isObject(re), 'Result should be an object');
  assert.equals(re.ACK, 'Failure', `Response's properry "ACK" must be an error`);
  assert.end();
});

test('When Paypal returns error', async (assert) => {
  nock('https://api-3t.sandbox.paypal.com')
    .post('/nvp', 'USER=&PWD=&SIGNATURE=&VERSION=204&METHOD=xMethod')
    .reply(500, 'Server error');

  const fakePaypal = nvp();
  try {
    await fakePaypal.request('xMethod', {});
  } catch (e) {
    const msg = 'Error: Response error with code: 500';
    assert.equals(e.message, msg, `It must throw: ${msg}`);
  } finally {
    assert.end();
  }
});
