
# API Reference

The `sdk` has the following methods (see [CUE SDK](https://github.com/CorsairOfficial/cue-sdk) documentation for full description)

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