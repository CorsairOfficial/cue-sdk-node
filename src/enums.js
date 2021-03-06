const CorsairDeviceType = {
  CDT_Unknown: 0,
  CDT_Mouse: 1,
  CDT_Keyboard: 2,
  CDT_Headset: 3,
  CDT_MouseMat: 4,
  CDT_HeadsetStand: 5,
  CDT_CommanderPro: 6,
  CDT_LightingNodePro: 7,
  CDT_MemoryModule: 8,
  CDT_Cooler: 9,
  CDT_Motherboard: 10,
  CDT_GraphicsCard: 11
}

const CorsairPhysicalLayout = {
  CPL_Invalid: 0,

  CPL_US: 1,
  CPL_UK: 2,
  CPL_BR: 3,
  CPL_JP: 4,
  CPL_KR: 5,

  CPL_Zones1: 6,
  CPL_Zones2: 7,
  CPL_Zones3: 8,
  CPL_Zones4: 9,
  CPL_Zones5: 10,
  CPL_Zones6: 11,
  CPL_Zones7: 12,
  CPL_Zones8: 13,
  CPL_Zones9: 14,
  CPL_Zones10: 15,
  CPL_Zones11: 16,
  CPL_Zones12: 17,
  CPL_Zones13: 18,
  CPL_Zones14: 19,
  CPL_Zones15: 20,
  CPL_Zones16: 21,
  CPL_Zones17: 22,
  CPL_Zones18: 23,
  CPL_Zones19: 24,
  CPL_Zones20: 25
}

const CorsairLogicalLayout = {
  CLL_Invalid: 0,
  CLL_US_Int: 1,
  CLL_NA: 2,
  CLL_EU: 3,
  CLL_UK: 4,
  CLL_BE: 5,
  CLL_BR: 6,
  CLL_CH: 7,
  CLL_CN: 8,
  CLL_DE: 9,
  CLL_ES: 10,
  CLL_FR: 11,
  CLL_IT: 12,
  CLL_ND: 13,
  CLL_RU: 14,
  CLL_JP: 15,
  CLL_KR: 16,
  CLL_TW: 17,
  CLL_MEX: 18
}

const CorsairDeviceCaps = {
  CDC_None: 0x0000,
  CDC_Lighting: 0x0001,
  CDC_PropertyLookup: 0x0002
}

const CorsairAccessMode = {
  CAM_ExclusiveLightingControl: 0
}

const CorsairError = {
  CE_Success: 0,
  CE_ServerNotFound: 1,
  CE_NoControl: 2,
  CE_ProtocolHandshakeMissing: 3,
  CE_IncompatibleProtocol: 4,
  CE_InvalidArguments: 5
}

const CorsairChannelDeviceType = {
  CCDT_Invalid: 0,
  CCDT_HD_Fan: 1,
  CCDT_SP_Fan: 2,
  CCDT_LL_Fan: 3,
  CCDT_ML_Fan: 4,
  CCDT_Strip: 5,
  CCDT_DAP: 6,
  CCDT_Pump: 7,
  CCDT_QL_Fan: 8,
  CCDT_WaterBlock: 9,
  CCDT_SPPRO_Fan: 10
}

const CorsairDevicePropertyType = {
  CDPT_Boolean: 0x1000,
  CDPT_Int32: 0x2000
}

const CorsairDevicePropertyId = {
  CDPI_Headset_MicEnabled: 0x1000,
  CDPI_Headset_SurroundSoundEnabled: 0x1001,
  CDPI_Headset_SidetoneEnabled: 0x1002,
  CDPI_Headset_EqualizerPreset: 0x2000
}

module.exports = {
  CorsairDeviceType,
  CorsairPhysicalLayout,
  CorsairLogicalLayout,
  CorsairDeviceCaps,
  CorsairAccessMode,
  CorsairError,
  CorsairChannelDeviceType,
  CorsairDevicePropertyType,
  CorsairDevicePropertyId
}
