# cue-sdk-node

## Intro

This wrapper can be used in node and electron apps.
It uses [prebuildify](https://github.com/prebuild/prebuildify) and is prebuilt for some runtime environments:

**Node**: 10.16.0, 11.8.0, 12.x, 13.x, 14.x

**Electron**: 6.0.0, 7.0.0, 8.0.0

## Prerequisites

- Node have to have N-API v4 (see [N-API Version Matrix](https://nodejs.org/api/n-api.html#n_api_n_api_version_matrix))

### Windows

- iCUE for Windows <https://www.corsair.com/icue>
- Microsoft Visual C++ Redistributable for Visual Studio 2017.
  - x86 <https://aka.ms/vs/15/release/VC_redist.x86.exe>
  - x64 <https://aka.ms/vs/15/release/VC_redist.x64.exe>

### macOS

- iCUE for macOS <https://www.corsair.com/icue-mac>

## Installation

> Note: you might need to install some tools to build from source on Windows before running `npm install` : <https://github.com/nodejs/node-gyp#installation>

```sh
npm install cue-sdk --save
```

## Usage

### 1. Create sdk instance

```js
const sdk = require('cue-sdk')
```

### 2. Perform handshake

```js
const details = sdk.CorsairPerformProtocolHandshake()
const errCode = sdk.CorsairGetLastError()
if (errCode === 0) {
  // 'CE_Success'
}
```

### 3. Control your devices

```js
const n = sdk.CorsairGetDeviceCount();

for (let i = 0; i < n; ++i) {
  const info = sdk.CorsairGetDeviceInfo(i);

  // example: read device properties
  if (info.capsMask & sdk.CorsairDeviceCaps.CDC_PropertyLookup) {
    console.log(info);
    Object.keys(sdk.CorsairDevicePropertyId).forEach(p => {
      const prop = sdk.CorsairGetDeviceProperty(i, sdk.CorsairDevicePropertyId[p]);
      if (!prop) {
        console.log(p, ':', sdk.CorsairErrorToString(sdk.CorsairGetLastError()));
      } else {
        console.log(p, prop.value);
      }
    });
  }

  if (info.capsMask & sdk.CorsairDeviceCaps.CDC_Lighting) {
    const positions = sdk.CorsairGetLedPositionsByDeviceIndex(i);
    const maxX = positions.reduce((acc, curr) => Math.max(curr.left, acc), 0);
    // create red gradient
    const colors = positions.map(p => ({ ledId: p.ledId, r: Math.floor(p.left / maxX * 255), g: 0, b: 0 }));
    sdk.CorsairSetLedsColorsBufferByDeviceIndex(i, colors);
    sdk.CorsairSetLedsColorsFlushBuffer();
  }
}
```

## Links

- API reference: <https://github.com/CorsairOfficial/cue-sdk-node/blob/master/api-reference.md>
- Code examples: <https://github.com/CorsairOfficial/cue-sdk-node/tree/master/example>
- List of supported devices: <https://corsairofficial.github.io/cue-sdk/#supported-devices>
