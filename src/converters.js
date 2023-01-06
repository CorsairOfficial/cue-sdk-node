const enums = require('./enums');

const CorsairErrorReverse = Object.create(null);
Object.keys(enums.CorsairError).forEach(key => {
  CorsairErrorReverse[enums.CorsairError[key]] = key;
});

function CorsairErrorToString(value) {
  return CorsairErrorReverse[value];
}

const CorsairSessionStateReverse = Object.create(null);
Object.keys(enums.CorsairSessionState).forEach(key => {
  CorsairSessionStateReverse[enums.CorsairSessionState[key]] = key;
});

function CorsairSessionStateToString(value) {
  return CorsairSessionStateReverse[value];
}

const CorsairDeviceTypeReverse = Object.create(null);
Object.keys(enums.CorsairDeviceType).forEach(key => {
  CorsairDeviceTypeReverse[enums.CorsairDeviceType[key]] = key;
});

function CorsairDeviceTypeToString(value) {
  return CorsairDeviceTypeReverse[value];
}

const CorsairEventIdReverse = Object.create(null);
Object.keys(enums.CorsairEventId).forEach(key => {
  CorsairEventIdReverse[enums.CorsairEventId[key]] = key;
});

function CorsairEventIdToString(value) {
  return CorsairEventIdReverse[value];
}

const CorsairDevicePropertyIdReverse = Object.create(null);
Object.keys(enums.CorsairDevicePropertyId).forEach(key => {
  CorsairDevicePropertyIdReverse[enums.CorsairDevicePropertyId[key]] = key;
});

function CorsairDevicePropertyIdToString(value) {
  return CorsairDevicePropertyIdReverse[value];
}

const CorsairDataTypeReverse = Object.create(null);
Object.keys(enums.CorsairDataType).forEach(key => {
  CorsairDataTypeReverse[enums.CorsairDataType[key]] = key;
});

function CorsairDataTypeToString(value) {
  return CorsairDataTypeReverse[value];
}

const CorsairPropertyFlagReverse = Object.create(null);
Object.keys(enums.CorsairPropertyFlag).forEach(key => {
  CorsairPropertyFlagReverse[enums.CorsairPropertyFlag[key]] = key;
});

function CorsairPropertyFlagToString(value) {
  return CorsairPropertyFlagReverse[value];
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

const CorsairChannelDeviceTypeReverse = Object.create(null);
Object.keys(enums.CorsairChannelDeviceType).forEach(key => {
  CorsairChannelDeviceTypeReverse[enums.CorsairChannelDeviceType[key]] = key;
});

function CorsairChannelDeviceTypeToString(value) {
  return CorsairChannelDeviceTypeReverse[value];
}

const CorsairAccessLevelReverse = Object.create(null);
Object.keys(enums.CorsairAccessLevel).forEach(key => {
  CorsairAccessLevelReverse[enums.CorsairAccessLevel[key]] = key;
});

function CorsairAccessLevelToString(value) {
  return CorsairAccessLevelReverse[value];
}

const CorsairLedGroupReverse = Object.create(null);
Object.keys(enums.CorsairLedGroup).forEach(key => {
  CorsairLedGroupReverse[enums.CorsairLedGroup[key]] = key;
});

function CorsairLedGroupToString(value) {
  return CorsairLedGroupReverse[value];
}

const CorsairLedId_KeyboardReverse = Object.create(null);
Object.keys(enums.CorsairLedId_Keyboard).forEach(key => {
  CorsairLedId_KeyboardReverse[enums.CorsairLedId_Keyboard[key]] = key;
});

function CorsairLedId_KeyboardToString(value) {
  return CorsairLedId_KeyboardReverse[value];
}

const CorsairMacroKeyIdReverse = Object.create(null);
Object.keys(enums.CorsairMacroKeyId).forEach(key => {
  CorsairMacroKeyIdReverse[enums.CorsairMacroKeyId[key]] = key;
});

function CorsairMacroKeyIdToString(value) {
  return CorsairMacroKeyIdReverse[value];
}

module.exports = {
  CorsairErrorToString,
  CorsairSessionStateToString,
  CorsairDeviceTypeToString,
  CorsairEventIdToString,
  CorsairDevicePropertyIdToString,
  CorsairDataTypeToString,
  CorsairPropertyFlagToString,
  CorsairPhysicalLayoutToString,
  CorsairLogicalLayoutToString,
  CorsairChannelDeviceTypeToString,
  CorsairAccessLevelToString,
  CorsairLedGroupToString,
  CorsairLedId_KeyboardToString,
  CorsairMacroKeyIdToString,
}
