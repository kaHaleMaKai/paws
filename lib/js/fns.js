'use strict';

const isUndefined = (v) =>
  typeof v === 'undefined';

const isObject = (v) =>
  typeof v === 'object';

const isNumber = (v) =>
  typeof v === 'number';

const isString = (v) =>
  typeof v === 'string'

const isArray = (v) =>
  typeof v === 'array';

const isFunction = (v) =>
  typeof v === 'function';

const isDate = (v) =>
  typeof v === 'date';

const isNull = (v) =>
  v === null;

const clone = (obj) => {
  let copy;

  // Handle the 3 simple types, and null or undefined
  if (isNull(obj) || !isObject(obj))
    copy = obj;

  // Handle Date
  else if (isDate(obj)) {
      copy = new Date();
      copy.setTime(obj.getTime());
  }

  // Handle Array
  else if (isArray(obj)) {
      copy = [];
      for (let el of obj)
          copy.push(clone(el));
  }

  // Handle Object
  else if (isObject(obj)) {
      copy = {};
      for (let attr of keys(obj))
        if (obj.hasOwnProperty(attr))
          copy[attr] = clone(obj[attr]);
  }
  else
    throw new Error("Unable to copy obj! Its type isn't supported.");

  return copy;
}

const keys = (obj) => {
  let _keys;
  if (isObject(obj)) {
    _keys = Object.keys(obj);
  }
  else if (isArray(obj)) {
    _keys = obj.keys();
  }
  return _keys;
}
exports.isUndefined = isUndefined;
exports.isNumber = isNumber;
exports.isString = isString;
exports.isDate = isDate;
exports.isNull = isNull;
exports.isObject = isObject;
exports.isArray = isArray;
exports.clone = clone;
