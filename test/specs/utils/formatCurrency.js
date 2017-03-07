/**
 * Testing
 * @ndaidong
 */

var bella = require('bellajs');
var test = require('tape');

var config = require('../config');

var nvp = config.main;
var paypal = nvp(config);

test('.formatCurrency()', (assert) => {

  let sample = [
    {
      value: 1234567,
      result: '1,234,567.00'
    },
    {
      value: 123456,
      result: '123,456.00'
    },
    {
      value: 12345,
      result: '12,345.00'
    },
    {
      value: 1234,
      result: '1,234.00'
    },
    {
      value: 123,
      result: '123.00'
    },
    {
      value: 12,
      result: '12.00'
    },
    {
      value: 1,
      result: '1.00'
    },
    {
      value: 0.1,
      result: '0.10'
    },
    {
      value: 0.12,
      result: '0.12'
    },
    {
      value: 0.123,
      result: '0.12'
    },
    {
      value: 12345.12345,
      result: '12,345.12'
    },
    {
      value: 12.5,
      result: '12.50'
    },
    {
      value: '12',
      result: '12.00'
    },
    {
      value: '',
      result: '0.00'
    },
    {
      value: '0',
      result: '0.00'
    },
    {
      value: '-1',
      result: '0.00'
    },
    {
      value: -1,
      result: '0.00'
    },
    {
      value: 'ABC',
      result: '0.00'
    }
  ];

  sample.forEach((item) => {
    let v = item.value;
    let result = paypal.formatCurrency(v);
    assert.deepEquals(result, item.result, ' / paypal.formatCurrency(' + (bella.isString(v) ? `'${v}'` : v) + ')');
  });

  assert.end();
});
