/**
 * Testing
 * @ndaidong
 */

const test = require('tap').test;

const {
  isFunction,
} = require('bellajs');

const {stringify} = require('../../../src/helpers');


test('.stringify()', (assert) => {
  assert.ok(isFunction(stringify), 'stringify() must be a function');

  const v1 = 'Just a string';
  const e1 = v1;
  assert.equals(stringify(v1), e1, `stringify('${v1}') must be '${e1}'`);

  const v2 = {
    a: {
      b: 1,
      c: {
        d: 2,
      },
    },
  };
  const e2 = 'a={"b":1,"c":{"d":2}}';
  assert.equals(stringify(v2), e2, `stringify('${v2}') must be '${e2}'`);

  assert.end();
});

