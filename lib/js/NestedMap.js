'use strict';

const fns = require('lib/js/fns.js');

const NestedMap = function(opts) {
  let _map = fns.isObject(opts) ? fns.clone(opts) : {};
  const _set = (m_, val, ...keys) => {
    let m = m_;
    const lengthOfKeys = keys.length;
    if (!lengthOfKeys)
      throw new Error('no key given');

    const firstKey = keys[0];
    if (lengthOfKeys == 1)
      m[firstKey] = val;
    else {
      if (!m.hasOwnProperty(firstKey))
        m[firstKey] = {};
      const lookup = m[firstKey];
      if (!fns.isObject(lookup))
        throw new Error('trying to override value of NestedMap instance (keys: ('+keys+'))');
      _set(m[firstKey], val, ...(keys.slice(1)));
    }
  };

  this.get = (...keys) => {
    let res;
    if (this.exists(...keys)) {
      res = keys.reduce((acc, k) => {
                                acc = acc[k];
                                return acc;},
                              _map);
    }
    else
      throw new Error('keys (' + keys + ') not found in map');
    return res;
  };
  this.exists = (key, ...keys) => {
    let res = _map.hasOwnProperty(key);
    if (res) {
      let m = _map[key];
      for (let k of keys)
        if (!m.hasOwnProperty(k)) {
          res = false;
          break;
        }
    }
    return res;
  };
  this.set = (val, ...keys) =>
    _set(_map, val, ...keys);

  this.unset = (...keys) => {
    let res = false;
    if (this.exists(...keys)) {
      const lastKey = keys.slice(-1);
      const keysBefore = keys.slice(0, -1);
      let m = this.get(...keysBefore);
      res = delete m[lastKey];
    }
    return res;
  }
};

exports.NestedMap = NestedMap;
