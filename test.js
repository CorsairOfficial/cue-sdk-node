const sdk = require('.');

console.log(sdk.CorsairPerformProtocolHandshake());
console.log(sdk.CorsairErrorToString(sdk.CorsairGetLastError()));
let n = sdk.CorsairGetDeviceCount();
console.log(n);
for (let i = 0; i < n; ++i) {
  let info = sdk.CorsairGetDeviceInfo(i);
  if (info.capsMask & sdk.CorsairDeviceCaps.CDC_PropertyLookup) {
    console.log(JSON.stringify(info, null, 2));
    Object.keys(sdk.CorsairDevicePropertyId).forEach(p => {
      let prop = sdk.CorsairGetDeviceProperty(i, sdk.CorsairDevicePropertyId[p]);
      if (!prop) {
        console.log(p, ':', sdk.CorsairErrorToString(sdk.CorsairGetLastError()));
      } else {
        console.log(p, prop.value);
      }
    });
  }
}