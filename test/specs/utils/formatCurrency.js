/**
 * Testing
 * @ndaidong
 */
/* global describe it */
/* eslint no-undefined: 0*/
/* eslint no-array-constructor: 0*/
/* eslint no-new-func: 0*/

'use strict';

var path = require('path');
var chai = require('chai');
var bella = require('bellajs');

chai.should();
var expect = chai.expect;

var config = require('../config');

var rootDir = '../../../src/';

var Paypal = require(path.join(rootDir, 'paypal-nvp-api'));
var paypal = Paypal(config);

describe('.formatCurrency()', () => {

  let sample = [
    {
      value: 12,
      result: '$12.00'
    },
    {
      value: 12.5,
      result: '$12.50'
    },
    {
      value: '12',
      result: '$0.00'
    },
    {
      value: '',
      result: '$0.00'
    }
  ]

  sample.forEach((item) => {
    let v = item.value;
    describe(' / paypal.formatCurrency(' + (bella.isString(v) ? `'${v}'` : v) + ')', () => {

      let result = paypal.formatCurrency(v);
      it(' should be "' + item.result + '"', (done) => {
        expect(result).to.equal(item.result);
        done();
      });
    });
  });
});
