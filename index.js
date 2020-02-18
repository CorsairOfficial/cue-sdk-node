const binding = require('node-gyp-build')(__dirname)
const enums = require('./src/enums');

const sdk = {
  ...enums,
  ...binding
};

module.exports = sdk;
