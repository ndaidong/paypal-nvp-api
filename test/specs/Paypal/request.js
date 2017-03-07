/**
 * Testing
 * @ndaidong
 */

var bella = require('bellajs');
var test = require('tape');

var config = require('../config');

var nvp = config.main;
var paypal = nvp(config);

var hasRequiredKey = (o, k) => {
  return bella.hasProperty(o, k);
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
  let fakePaypal = nvp();
  fakePaypal.request('GetBalance', {}).then((re) => {
    assert.ok(bella.isObject(re), 'Result should be an object');
    assert.equals(re.ACK, 'Failure', 'It must be an error');
  }).catch((e) => {
    console.log(e);
    return false;
  }).finally(assert.end);

});
