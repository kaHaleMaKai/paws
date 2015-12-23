const self = require('sdk/self');

let tabOptions = {}

const tabOptionExists = (tab, opt) =>
  tab.hasAttribute(opt);

const getTabOption = (tab) => {
  tabOptions[tab.id];

const setTabOption = (tab, opts) => {
  for (let key of opts)
    tab[key] = opts[key];

let button = ToggleButton({
  id: "paws-link",
  label: "engage paws mode",
  icon: {
    "16": "./icons/paw-16x16.png",
    "32": "./icons/paw-32x32.png",
    "64": "./icons/paw-64x64.png"
  },
  onClick: (_) => {
    tab = tabs.activeTab;
    let worker = tab.attach({
      contentScriptFile: 'scripts/contentscripts/replace.js'
    });
    button.state('window', null);
    const checked = !button.state('tab').checked;
    button.state('tab', {checked: checked});
    worker.port.emit('togglePaws', checked);
    if (!tabOptionExists(tab, 'paw')) {
      setTabOption('paw', false);
      worker.port.emit('imageTransferPing', 'paw');
    }
    worker.port.on('imageTransferRequest', (imageId) => {
      if (!tabOptionExists(tab,imageId) || !getTabOption(tab, imageId)) {
        const img = getImage(imageId);
        worker.port.emit('imageTransfer',imageId);
      }
    });
  }
});

tabs.open('https://en.wikipedia.org');

function dummy(text, callback) {
  callback(text);
}

exports.dummy = dummy;
loadImage('paw', 'file:///home/lars/paw-64x64.png');
