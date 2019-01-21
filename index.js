const binary = require('node-pre-gyp');
const path = require('path')
const binding_path = binary.find(path.resolve(path.join(__dirname,'./package.json')));
const binding = require(binding_path);
const enums = require('./src/enums');

const sdk = {
  ...enums,
  ...binding
};

module.exports = sdk;
