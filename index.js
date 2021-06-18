const enums = require('./src/enums')
const converters = require('./src/converters')
let binding

try {
  binding = require('node-gyp-build')(__dirname)
  binding.CorsairGetLastError()
} catch {
  binding = {
    CorsairPerformProtocolHandshake: function () {
      return null
    },
    CorsairGetLastError: function () {
      return enums.CorsairError.CE_ProtocolHandshakeMissing
    },
    CorsairGetDeviceCount: function () {
      return 0
    }
  }
}

const sdk = {
  ...enums,
  ...converters,
  ...binding
}

module.exports = sdk
