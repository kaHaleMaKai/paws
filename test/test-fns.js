'use strict';

const fns = require("../lib/js/fns.js");

exports['test isUndefined'] = (assert) => {
  assert.equal(fns.isUndefined(undefined), true, 'isUndefined equals true for undefined');
  assert.equal(fns.isUndefined({'prop': 'value'}), false, 'isUndefined equals false for objects');
  assert.equal(fns.isUndefined(8), false, 'isUndefined equals false for primites');
};

exports['test clone on simple values'] = (assert) => {
  const i = 1;
  const f = 1.1;
  const s = 'hello';
  assert.equal(fns.clone(i), i, 'cloned integer');
  assert.equal(fns.clone(f), f, 'cloned float');
  assert.equal(fns.clone(s), s, 'cloned string');
};

exports['test clone on array'] = (assert) => {
  const a = [1, 2];
  const a2 = fns.clone([1, 2]);
  assert.equal(a[0], a2[0], 'cloned array');
  assert.equal(a[1], a2[1], 'cloned array');
};

exports['test clone on object'] = (assert) => {
  const o = {a: 1, b: 2};
  const o2 = fns.clone({a: 1, b: 2});
  assert.equal(o.a, o2.a, 'cloned object');
  assert.equal(o.b, o2.b, 'cloned object');
};
exports['test clone on nestedobject'] = (assert) => {
  const n = {a: 1, b: {c: 2}};
  const n2 = fns.clone({a: 1, b: {c: 2}});

  assert.equal(n.a, n2.a, 'cloned nested object');
  assert.equal(n.b.c, n2.b.c, 'cloned nested object');
};

require("sdk/test").run(exports);
