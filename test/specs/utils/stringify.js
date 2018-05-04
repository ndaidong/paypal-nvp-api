/**
 * Testing
 * @ndaidong
 */

const test = require('tape');

const {
  isFunction,
} = require('bellajs');

const {stringify} = require('../../../src/helpers');


test('.stringify()', (assert) => {
  assert.ok(isFunction(stringify), 'stringify() must be a function');

  let v1 = 'Just a string';
  let e1 = v1;
  assert.equals(stringify(v1), e1, `stringify('${v1}') must be '${e1}'`);

  let v2 = {
    a: {
      b: 1,
      c: {
        d: 2,
      },
    },
  };
  let e2 = 'a={"b":1,"c":{"d":2}}';
  assert.equals(stringify(v2), e2, `stringify('${v2}') must be '${e2}'`);

  assert.end();
});

