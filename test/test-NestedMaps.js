'use strict';

const { NestedMap } = require("../lib/js/NestedMap.js");

exports['test NestedMap empty constructor'] = (assert) => {
  let nm = new NestedMap();

  nm.set(1, 'a');
  assert.equal(nm.get('a'), 1, 'non-nested key lookup');
  assert.throws(() => nm.set(2, 'a', 'b'), 'trying to override value');
  assert.throws(() => nm.get('a', 'b'), 'trying to access non-existing keys');
  nm.set(2, 'b', 'c');
  assert.equal(nm.get('b', 'c'), 2, 'nested key lookup');
};

exports['test NestedMap with constructor argument'] = (assert) => {
  let nm = new NestedMap({'a': 1, 'b': {'c': 2}});
  assert.equal(nm.get('a'), 1, 'non-nested key lookup');
  assert.equal(nm.get('b', 'c'), 2, 'nested key lookup');
};

exports['test NestedMap delete'] = (assert) => {
  let nm = new NestedMap({'a': 1, 'b': {'c': 2}});
  assert.equal(nm.get('b', 'c'), 2, 'nested key lookup');
  assert.equal(nm.unset('b', 'c'), true, 'deleting yields true');
  assert.throws(() => nm.get('b', 'c'), 'trying to access non-existing keys');
  assert.equal(nm.unset('b', 'c'), false, 'deleting yields false');
};

require("sdk/test").run(exports);

