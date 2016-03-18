/**
 * Testing
 * @ndaidong
 */
/* global describe it */
/* eslint no-undefined: 0*/
/* eslint no-array-constructor: 0*/
/* eslint no-new-func: 0*/
/* eslint no-console: 0*/

'use strict';

var path = require('path');
var chai = require('chai');

chai.should();
var expect = chai.expect;

var config = require('../config');

var rootDir = '../../../src/';

var Paypal = require(path.join(rootDir, 'paypal-nvp-api'));
var paypal = Paypal(config);

describe('.GetBalance()', () => {

  let result;

  before((done) => {
    paypal.request('GetBalance', {}).then((re) => {
      result = re;
    }).catch((e) => {
      console.log(e);
      return false;
    }).finally(done);
  });

  it(' should be an object', (done) => {
    expect(result).to.be.an('object');
    done();
  });

  it(' should contain regular properties', (done) => {
    expect(result).to.have.all.keys(
      'L_AMT0',
      'L_CURRENCYCODE0',
      'TIMESTAMP',
      'CORRELATIONID',
      'ACK',
      'VERSION',
      'BUILD'
    );
    done();
  });
});

describe('.SetExpressCheckout()', () => {

  let query = {
    'PAYMENTREQUEST_0_AMT': '20.00',
    'PAYMENTREQUEST_0_CURRENCYCODE': 'USD',
    'PAYMENTREQUEST_0_PAYMENTACTION': 'Sale',
    'RETURNURL': 'http://google.com/test/onreturn',
    'CANCELURL': 'http://google.com/test/oncancel'
  };
  let result;

  before((done) => {
    paypal.request('SetExpressCheckout', query).then((re) => {
      result = re;
    }).catch((e) => {
      console.log(e);
      return false;
    }).finally(done);
  });

  it(' should be an object', (done) => {
    console.log(result);
    expect(result).to.be.an('object');
    done();
  });

  it(' should contain regular properties', (done) => {
    expect(result).to.have.all.keys(
      'TOKEN',
      'TIMESTAMP',
      'CORRELATIONID',
      'ACK',
      'VERSION',
      'BUILD'
    );
    done();
  });
});
