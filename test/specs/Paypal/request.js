/**
 * Testing
 * @ndaidong
 */
var path = require('path');

var bella = require('bellajs');
var test = require('tape');

var config = require('../config');
var rootDir = config.rootDir;

var nvp = require(path.join(rootDir, 'paypal-nvp-api'));
var paypal = nvp(config);

var hasRequiredKeys = (o, keys) => {
  return keys.every((k) => {
    return bella.hasProperty(o, k);
  });
};

test('.GetBalance()', (assert) => {
  let props = [
    'L_AMT0',
    'L_CURRENCYCODE0',
    'TIMESTAMP',
    'CORRELATIONID',
    'ACK',
    'VERSION',
    'BUILD'
  ];

  paypal.request('GetBalance', {}).then((re) => {
    assert.ok(bella.isObject(re), 'Result should be an object');
    assert.ok(hasRequiredKeys(re, props), 'Result should contain regular properties');
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
    CANCELURL: 'http://google.com/test/oncancel'
  };

  let props = [
    'TOKEN',
    'TIMESTAMP',
    'CORRELATIONID',
    'ACK',
    'VERSION',
    'BUILD'
  ];

  paypal.request('SetExpressCheckout', query).then((re) => {
    assert.ok(bella.isObject(re), 'Result should be an object');
    assert.ok(hasRequiredKeys(re, props), 'Result should contain regular properties');
  }).catch((e) => {
    console.log(e);
    return false;
  }).finally(assert.end);
});


test('Call a unexist method', (assert) => {

  paypal.request('CallUnexistMethod', {}).then((re) => {
    assert.ok(bella.isObject(re), 'Result should be an object');
    assert.equals(re.ACK, 'Failure', 'It must be an error');
  }).catch((e) => {
    console.log(e);
    return false;
  }).finally(assert.end);

});

test('Call with invalid params', (assert) => {

  paypal.request('GetBalance', 'noop').then((re) => {
    assert.ok(bella.isObject(re), 'Result should be an object');
    assert.equals(re.ACK, 'Failure', 'It must be an error');
  }).catch((e) => {
    console.log(e);
    return false;
  }).finally(assert.end);

});

test('Call with instance initialized from the bad configs', (assert) => {
  let fakePaypal = nvp({
    rootDir: '../../../src/',
    mode: 'sandbox',
    track: 'https://www.sandbox.paypal.com',
    username: 'facilitator_api1.itravellocal.com',
    password: 'AYKNJZZE42ASU691',
    signature: 'A0aEilikhBmwfK.NlduDjCbsdgRdT8VDPMDksDhGsHmLBECu80Qtru19'
  });

  fakePaypal.request('GetBalance', {}).then((re) => {
    assert.ok(bella.isObject(re), 'Result should be an object');
    assert.equals(re.ACK, 'Failure', 'It must be an error');
  }).catch((e) => {
    console.log(e);
    return false;
  }).finally(assert.end);

});
