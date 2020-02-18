Node.js native wrapper around CUE SDK
=====================================

This wrapper can be used in node and electron apps.
It uses [prebuildify](https://github.com/prebuild/prebuildify) and is prebuilt for some runtime environments:

**Node**: 8.16.0, 10.16.0, 11.8.0, 12.0.0

**Electron**: 6.0.0, 7.0.0, 8.0.0

The API is almost the same as in CUE SDK itself.

## Prerequisites

- Microsoft C Runtime Library (v140) - required by `CUESDK*.dll`

## Installation

> Note: you might need to install some tools to build from source before running `npm install` : https://github.com/nodejs/node-gyp#installation

```
npm install cue-sdk
```

## How to use

### 1. Create sdk instance
```js
const sdk = require('cue-sdk');
```

### 2. Perform handshake
```js
const details = sdk.CorsairPerformProtocolHandshake();
const errCode = sdk.CorsairGetLastError();
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
        console.log(p, ':', sdk.CorsairErrorString[sdk.CorsairGetLastError()]);
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

## API Reference

The `sdk` has the following methods (see CUESDK documentation for full description)

### `CorsairGetLastError()`

Returns `Number`: error code

`sdk.CorsairErrorString[sdk.CorsairGetLastError()]` converts error code to string

### `CorsairGetDeviceCount()`

Returns `Number`: number of connected devices

### `CorsairPerformProtocolHandshake()`

Returns `Object`: protocol handshake details

### `CorsairGetDeviceInfo(deviceIndex)`

* `deviceIndex` - zero based device index

Returns `Object | undefined`: device info

### `CorsairGetLedsColors(colors)`

* `colors` - array of led color objects (e.g., `{ ledId: 1, r: 0, g: 0, b: 0 }`) (see `CorsairLedIdEnum.h` from CUE SDK package to get values for `ledId`)

Returns `Boolean`: true for success

### `CorsairSetLedsColors(colors)`

* `colors` - array of led color objects (e.g., `{ ledId: 1, r: 0, g: 0, b: 0 }`) (see `CorsairLedIdEnum.h` from CUE SDK package to get values for `ledId`)

Returns `Boolean`: true for success

### `CorsairGetLedsColorsByDeviceIndex(deviceIndex, colors)`

* `deviceIndex` - zero based device index
* `colors` - array of led color objects (e.g., `{ ledId: 1, r: 0, g: 0, b: 0 }`) (see `CorsairLedIdEnum.h` from CUE SDK package to get values for `ledId`)

### `CorsairSetLedsColorsBufferByDeviceIndex(deviceIndex, colors)`

* `deviceIndex` - zero based device index
* `colors` - array of led color objects (e.g., `{ ledId: 1, r: 0, g: 0, b: 0 }`) (see `CorsairLedIdEnum.h` from CUE SDK package to get values for `ledId`)

Returns `Boolean`: true for success

### `CorsairSetLedsColorsFlushBuffer()`

Returns `Boolean`: true for success

### `CorsairSetLedsColorsFlushBufferAsync(callback)`

Returns `Boolean`: true for success

### `CorsairSetLedsColorsAsync(colors, callback)`

Returns `Boolean`: true for success

### `CorsairGetLedPositions()`

Returns `Object[]`: array of led positions for keyboard. Can be empty if keyboard is not connected

### `CorsairGetLedPositionsByDeviceIndex(deviceIndex)`

* `deviceIndex` - zero based device index

Returns `Object[]`: array of led positions for specified device. Can be empty if `deviceIndex` is invalid

### `CorsairGetLedIdForKeyName(keyName)`

* `keyName` - single character, name of the key on keyboard

Returns `Number`: led id

### `CorsairRequestControl()`

### `CorsairReleaseControl()`

### `CorsairSetLayerPriority(priority)`

### `CorsairGetDeviceProperty(deviceIndex, propertyId)`

* `deviceIndex` - zero based device index
* `propertyId` - id of property, `sdk.CorsairDevicePropertyId`'s member

### `CorsairSubscribeForEvents(onEvent)`
Sets up a function that will be called whenever the event has occurred. Supported events are: `macrokeydown`, `macrokeyup`, `deviceconnect` and `devicedisconnect`

* `onEvent(event)` - event listener specified as a callback function. The callback accepts a single parameter: an object describing the event which has occurred, and it returns nothing.

Returns `Boolean`: flag indicating whether subscription was successful or not

### `CorsairUnsubscribeFromEvents()`

Removes callback set by `CorsairSubscribeForEvents()` call

Returns `Boolean`: flag indicating whether unsubscription was successful or not