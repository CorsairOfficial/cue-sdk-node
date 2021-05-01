const enums = require('./enums');

const CorsairDeviceTypeReverse = Object.create(null);
Object.keys(enums.CorsairDeviceType).forEach(key => {
  CorsairDeviceTypeReverse[enums.CorsairDeviceType[key]] = key;
});

function CorsairDeviceTypeToString(value) {
  return CorsairDeviceTypeReverse[value];
}

const CorsairPhysicalLayoutReverse = Object.create(null);
Object.keys(enums.CorsairPhysicalLayout).forEach(key => {
  CorsairPhysicalLayoutReverse[enums.CorsairPhysicalLayout[key]] = key;
});

function CorsairPhysicalLayoutToString(value) {
  return CorsairPhysicalLayoutReverse[value];
}

const CorsairLogicalLayoutReverse = Object.create(null);
Object.keys(enums.CorsairLogicalLayout).forEach(key => {
  CorsairLogicalLayoutReverse[enums.CorsairLogicalLayout[key]] = key;
});

function CorsairLogicalLayoutToString(value) {
  return CorsairLogicalLayoutReverse[value];
}

const CorsairAccessModeReverse = Object.create(null);
Object.keys(enums.CorsairAccessMode).forEach(key => {
  CorsairAccessModeReverse[enums.CorsairAccessMode[key]] = key;
});

function CorsairAccessModeToString(value) {
  return CorsairAccessModeReverse[value];
}

const CorsairErrorReverse = Object.create(null);
Object.keys(enums.CorsairError).forEach(key => {
  CorsairErrorReverse[enums.CorsairError[key]] = key;
});

function CorsairErrorToString(value) {
  return CorsairErrorReverse[value];
}

const CorsairChannelDeviceTypeReverse = Object.create(null);
Object.keys(enums.CorsairChannelDeviceType).forEach(key => {
  CorsairChannelDeviceTypeReverse[enums.CorsairChannelDeviceType[key]] = key;
});

function CorsairChannelDeviceTypeToString(value) {
  return CorsairChannelDeviceTypeReverse[value];
}

module.exports = {
  CorsairDeviceTypeToString,
  CorsairPhysicalLayoutToString,
  CorsairLogicalLayoutToString,
  CorsairAccessModeToString,
  CorsairErrorToString,
  CorsairChannelDeviceTypeToString,
}
