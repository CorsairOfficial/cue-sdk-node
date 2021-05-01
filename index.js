const binding = require('node-gyp-build')(__dirname)
const enums = require('./src/enums');
const converters = require('./src/converters')

const sdk = {
  ...enums,
  ...converters,
  ...binding,
};

module.exports = sdk;
