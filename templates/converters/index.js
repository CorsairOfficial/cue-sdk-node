const ejs = require('ejs')
const path = require('path')
const fs = require('fs')
const template = path.join(__dirname, './main.ejs')
const output = path.join(__dirname, '../../src/converters.js')

const data = {
  enumtypes: [
    'CorsairError',
    'CorsairSessionState',
    'CorsairDeviceType',
    'CorsairEventId',
    'CorsairDevicePropertyId',
    'CorsairDataType',
    'CorsairPropertyFlag',
    'CorsairPhysicalLayout',
    'CorsairLogicalLayout',
    'CorsairChannelDeviceType',
    'CorsairAccessLevel',
    'CorsairLedGroup',
    'CorsairLedId_Keyboard',
    'CorsairMacroKeyId'
  ]
}

const options = {}

const main = () => {
  console.log('Generating enum converters...')
  try {
    ejs.renderFile(template, data, options, function (err, str) {
      if (err) {
        console.error(err)
      }
      fs.writeFileSync(output, str)
      console.log('Saved to ' + output)

    })
  } catch (err) {
    console.error(err)
  }
}

main()
