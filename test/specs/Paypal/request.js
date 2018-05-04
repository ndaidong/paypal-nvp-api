/**
 * Testing
 * @ndaidong
 */

/* eslint-disable no-console */

const test = require('tape');
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

test('.GetBalance()', (assert) => {
  let props = [
    'L_AMT0',
    'L_CURRENCYCODE0',
    'TIMESTAMP',
    'CORRELATIONID',
    'ACK',
    'VERSION',
    'BUILD',
  ];

  paypal.request('GetBalance', {}).then((re) => {
    assert.ok(isObject(re), 'Result should be an object');
    props.forEach((k) => {
      assert.ok(hasRequiredKey(re, k), `Result must have the required property "${k}"`);
    });
  }).catch((e) => {
    console.log(e);
    return false;
  }).finally(assert.end);
});

test('.SetExpressCheckout()', (assert) => {
  let query = {
    PAYMENTREQUEST_0_AMT: '20.00',
    PAYMENTREQUEST_0_CURRENCYCODE: 'USD',
    PAYMENTREQUEST_0_PAYMENTACTION: 'Sale',
    RETURNURL: 'http://google.com/test/onreturn',
    CANCELURL: 'http://google.com/test/oncancel',
  };

  let props = [
    'TOKEN',
    'TIMESTAMP',
    'CORRELATIONID',
    'ACK',
    'VERSION',
    'BUILD',
  ];

  paypal.request('SetExpressCheckout', query).then((re) => {
    assert.ok(isObject(re), 'Result should be an object');
    props.forEach((k) => {
      assert.ok(hasRequiredKey(re, k), `Result must have the required property "${k}"`);
    });
  }).catch((e) => {
    console.log(e);
    return false;
  }).finally(assert.end);
});


test('Call a unexist method', (assert) => {
  paypal.request('CallUnexistMethod', {}).then((re) => {
    assert.ok(isObject(re), 'Result should be an object');
    assert.equals(re.ACK, 'Failure', `Response's properry "ACK" must be an error`);
  }).catch((e) => {
    console.log(e);
    return false;
  }).finally(assert.end);
});

test('Call with invalid params', (assert) => {
  paypal.request('GetBalance', 'noop').then((re) => {
    assert.ok(isObject(re), 'Result should be an object');
    assert.equals(re.ACK, 'Failure', `Response's properry "ACK" must be an error`);
  }).catch((e) => {
    console.log(e);
    return false;
  }).finally(assert.end);
});

test('Call with instance initialized from the bad configs', (assert) => {
  let fakePaypal = nvp();
  fakePaypal.request('GetBalance', {}).then((re) => {
    assert.ok(isObject(re), 'Result should be an object');
    assert.equals(re.ACK, 'Failure', `Response's properry "ACK" must be an error`);
  }).catch((e) => {
    console.log(e);
    return false;
  }).finally(assert.end);
});

test('When Paypal returns error', (assert) => {
  nock('https://api-3t.sandbox.paypal.com')
    .log(console.log)
    .post('/nvp', 'USER=&PWD=&SIGNATURE=&VERSION=204&METHOD=xMethod')
    .reply(500, 'Server error');
  let fakePaypal = nvp();
  fakePaypal.request('xMethod', {}).then((re) => {
    console.log(re);
  }).catch((e) => {
    let msg = 'Error: Response error with code: 500';
    assert.equals(e.message, msg, `It must throw: ${msg}`);
    return false;
  }).finally(assert.end);
});
