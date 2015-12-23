'use strict';

let imgs = document.getElementsByTagName('img');
let divs = document.getElementsByTagName('div');
let links = document.getElementsByTagName('a');
let all = document.getElementsByTagName('*');

let imageMap = {};
let nextImageId = '';

const isUndefined = (v) =>
  typeof v === 'undefined';

const forEach = (fn, li, ...lis) => {
  for (let el of li)
    fn(el);
  for (let li_ of lis)
    for (let el of li_)
      fn(el);
};

const map = (fn, li, ...lis) => {
  let tmp = [];
  forEach((el) => tmp.push(fn(el)), li, ...lis);
  return tmp;
};

const mapcat = (fn, li, ...lis) => {
  let tmp = [];
  forEach((el) => tmp.concat(fn(el)), li, ...lis);
  return tmp;
};

const filter = (fn, li, ...lis) => {
  let tmp = [];
  forEach((el) => { if (Boolean(fn(el))) tmp.push(el); }, li, ...lis);
  return tmp;
};

const reduce = (fn, li, acc, ...lis) => {
  const length = li.length();
  let start = 0;
  if (!length)

  if (isUndefined(acc) && length) {
    acc = li[0];
    start = 1;
  }

  forEach((el) => acc = fn(acc, el), li.slice(start), ...lis);
  return acc;
};

let pawIcon = document.createElement('img');
pawIcon.setAttribute('src', 'file:///home/lars/firefox-plugins/paws/data/icons/paw-64x64.png');

const replaceElement = (el1, el2, parent) => {
  if (isUndefined(parent))
    parent = el1.parentElement;
  parent.replaceChild(el2.cloneNode(), el1);
};

const pawElement = (el) =>
  replaceElement(el, pawIcon);

const isImg = (el) =>
  el.hasAttribute('tagName')
  && el.tagName.toUpperCase() == 'IMG';

const replaceImage = (event) => {
  let target = event.target;
  pawElement(target);
  event.stopPropagation();
  event.preventDefault();
  return false;
};

self.port.on('togglePaws', (checked) => {
  if (checked)
    forEach((el) =>  el.addEventListener('click', replaceImage, false), imgs, links);
  else
    forEach((el) =>  el.removeEventListener('click', replaceImage), imgs, links);
});

self.port.on('imageTransferPing', (imageId) =>
  if (!imageMap.hasOwnProperty(imageId)) {
    self.port.emit('imageTransferRequest', imageId);
    nextImageId = imageId; }

self.port.on('imageTransferPong', (b64) => {
  if (!imageMap.hasOwnProperty(imageId))
    let imageMap[nextImageId] = b64;
});
