# cue-sdk-node

## Intro

This wrapper can be used in node and electron apps.
It uses [prebuildify](https://github.com/prebuild/prebuildify) and is prebuilt for some runtime environments:

**Node**: 10.16.0, 11.8.0, 12.x, 13.x, 14.x

**Electron**: 6.0.0, 7.0.0, 8.0.0

## Prerequisites

- Node have to have N-API v4 (see [N-API Version Matrix](https://nodejs.org/api/n-api.html#n_api_n_api_version_matrix))

### Windows

- [iCUE for Windows](https://www.corsair.com/icue)
- Microsoft Visual C++ Redistributable for Visual Studio 2019.
  - x86 <https://aka.ms/vs/17/release/vc_redist.x86.exe>
  - x64 <https://aka.ms/vs/17/release/vc_redist.x64.exe>

### macOS

- [iCUE for macOS](https://www.corsair.com/icue-mac)

## Installing

> Note: you might need to install some tools to build from source on Windows before running `npm install` : <https://github.com/nodejs/node-gyp#installation>

```sh
npm install cue-sdk --save
```
