const sdk = require('.');

console.log(sdk.CorsairPerformProtocolHandshake());
console.log(sdk.CorsairGetLastError());
let n = sdk.CorsairGetDeviceCount();
console.log(n);
for (let i = 0; i < n; ++i) {
  let info = sdk.CorsairGetDeviceInfo(i);
  if (info.capsMask & sdk.CorsairDeviceCaps.CDC_PropertyLookup) {
    console.log(info);
    Object.keys(sdk.CorsairDevicePropertyId).forEach(p => {
      let prop = sdk.CorsairGetDeviceProperty(i, sdk.CorsairDevicePropertyId[p]);
      if (!prop) {
        console.log(p, ':', sdk.CorsairErrorString[sdk.CorsairGetLastError()]);
      } else {
        console.log(p, prop.value);
      }
    });
  }
}