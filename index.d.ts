export enum CorsairDeviceType {
  CDT_Unknown = 0,
  CDT_Mouse = 1,
  CDT_Keyboard = 2,
  CDT_Headset = 3,
  CDT_MouseMat = 4,
  CDT_HeadsetStand = 5,
  CDT_CommanderPro = 6,
  CDT_LightingNodePro = 7,
  CDT_MemoryModule = 8,
  CDT_Cooler = 9,
  CDT_Motherboard = 10,
  CDT_GraphicsCard = 11,
}

export enum CorsairPhysicalLayout {
  CPL_Invalid = 0,
  CPL_US = 1,
  CPL_UK = 2,
  CPL_BR = 3,
  CPL_JP = 4,
  CPL_KR = 5,
  CPL_Zones1 = 6,
  CPL_Zones2 = 7,
  CPL_Zones3 = 8,
  CPL_Zones4 = 9,
  CPL_Zones5 = 10,
  CPL_Zones6 = 11,
  CPL_Zones7 = 12,
  CPL_Zones8 = 13,
  CPL_Zones9 = 14,
  CPL_Zones10 = 15,
  CPL_Zones11 = 16,
  CPL_Zones12 = 17,
  CPL_Zones13 = 18,
  CPL_Zones14 = 19,
  CPL_Zones15 = 20,
  CPL_Zones16 = 21,
  CPL_Zones17 = 22,
  CPL_Zones18 = 23,
  CPL_Zones19 = 24,
  CPL_Zones20 = 25
}

export enum CorsairLogicalLayout {
  CLL_Invalid = 0,
  CLL_US_Int = 1,
  CLL_NA = 2,
  CLL_EU = 3,
  CLL_UK = 4,
  CLL_BE = 5,
  CLL_BR = 6,
  CLL_CH = 7,
  CLL_CN = 8,
  CLL_DE = 9,
  CLL_ES = 10,
  CLL_FR = 11,
  CLL_IT = 12,
  CLL_ND = 13,
  CLL_RU = 14,
  CLL_JP = 15,
  CLL_KR = 16,
  CLL_TW = 17,
  CLL_MEX = 18,
}

/**
 * Function to get a string representation of CorsairLogicalLayout enum value
 *
 * @param value CorsairLogicalLayout enum value
 * 
 * @returns keyof typeof CorsairLogicalLayout
 */
export function CorsairLogicalLayoutToString(value: CorsairLogicalLayout): keyof typeof CorsairLogicalLayout;

export enum CorsairDeviceCaps {
  CDC_None = 0x0000,
  CDC_Lighting = 0x0001,
  CDC_PropertyLookup = 0x0002,
}

export enum CorsairAccessMode {
  CAM_ExclusiveLightingControl = 0,
}

export enum CorsairError {
  CE_Success = 0,
  CE_ServerNotFound = 1,
  CE_NoControl = 2,
  CE_ProtocolHandshakeMissing = 3,
  CE_IncompatibleProtocol = 4,
  CE_InvalidArguments = 5,
}

/**
 * Function to get a string representation of CorsairError enum value
 *
 * @param value CorsairError enum value
 * 
 * @returns keyof typeof CorsairError
 */
export function CorsairErrorToString(value: CorsairError): keyof typeof CorsairError;

export enum CorsairChannelDeviceType {
  CCDT_Invalid = 0,
  CCDT_HD_Fan = 1,
  CCDT_SP_Fan = 2,
  CCDT_LL_Fan = 3,
  CCDT_ML_Fan = 4,
  CCDT_Strip = 5,
  CCDT_DAP = 6,
  CCDT_Pump = 7,
  CCDT_QL_Fan = 8,
  CCDT_WaterBlock = 9,
  CCDT_8LedSeriesFan = 10,
}

export enum CorsairDevicePropertyType {
  CDPT_Boolean = 0x1000,
  CDPT_Int32 = 0x2000,
}

export enum CorsairDevicePropertyId {
  CDPI_Headset_MicEnabled = 0x1000,
  CDPI_Headset_SurroundSoundEnabled = 0x1001,
  CDPI_Headset_SidetoneEnabled = 0x1002,
  CDPI_Headset_EqualizerPreset = 0x2000,
}

export interface CorsairProtocolHandshake {
  sdkVersion: string;
  serverVersion: string;
  sdkProtocolVersion: number;
  serverProtocolVersion: number;
  breakingChanges: boolean;
}

export interface CorsairChannelDeviceInfo {
  type: CorsairChannelDeviceType;
  deviceLedCount: number;
}

export interface CorsairChannelInfo {
  totalLedsCount: number;
  devices: Array<CorsairChannelDeviceInfo>;
}

export interface CorsairDeviceInfo {
  type: number;
  model: string;
  physicalLayout: CorsairPhysicalLayout;
  logicalLayout: CorsairLogicalLayout;
  capsMask: number;
  ledsCount: number;
  channels: Array<CorsairChannelInfo>;
  deviceId: string;
}

export interface CorsairLedColor {
  ledId: number;
  r: number;
  g: number;
  b: number;
}

export interface CorsairLed {
  ledId: number;
  top: number;
  left: number;
  height: number;
  width: number;
}

/**
 * Function to get the last occured error
 *
 * @returns CorsairError
 */
export function CorsairGetLastError(): CorsairError;

/**
 * Function to get the amount of conntected
 *
 * devices
 *
 * @returns number
 */
export function CorsairGetDeviceCount(): number;

/**
 * Function to check file and protocol version of CUE
 *
 * @returns CorsairProtocolHandshake
 */
export function CorsairPerformProtocolHandshake(): CorsairProtocolHandshake;

/**
 * Function to get the device information by
 *
 * the device index
 *
 * @param deviceIndex zero based device index
 *
 * @returns CorsairDeviceInfo | undefined
 */
export function CorsairGetDeviceInfo(
  deviceIndex: number,
): CorsairDeviceInfo | undefined;

/**
 * Function to get the current color for CorsairLedColor's in an array.
 *
 * The function replaces the r,g,b values in the array with
 *
 * the current values
 *
 * @param colors array with CorsairLedColor
 *
 * @returns boolean
 */
export function CorsairGetLedsColors(colors: Array<CorsairLedColor>): boolean;

/**
 * Function to set the current color for CorsairLedColor's in an array
 *
 * @param colors array with CorsairLedColor
 *
 * @returns boolean
 */
export function CorsairSetLedsColors(colors: Array<CorsairLedColor>): boolean;

/**
 * Function to get the current color for CorsairLedColor's in an array
 *
 * for a specific device. The function replaces the r,g,b values
 *
 * in the array with the current values
 *
 * @param deviceIndex zero based device index
 *
 * @param colors array with CorsairLedColor
 *
 * @returns boolean
 */
export function CorsairGetLedsColorsByDeviceIndex(
  deviceIndex: number,
  colors: Array<CorsairLedColor>,
): boolean;

/**
 * Function to set the current color for CorsairLedColor's in an array for a
 *
 * specific device.
 *
 * @param deviceIndex zero based device index
 *
 * @param colors array with CorsairLedColor
 *
 * @returns boolean
 */
export function CorsairSetLedsColorsBufferByDeviceIndex(
  deviceIndex: number,
  colors: Array<CorsairLedColor>,
): boolean;

/**
 * Function to write the previously filled buffer
 *
 * to the device LEDs
 *
 * @returns boolean
 */
export function CorsairSetLedsColorsFlushBuffer(): boolean;

/**
 * Function to write the previously filled buffer
 *
 * asynchronously to the devices LED
 *
 * @param callback callback function
 *
 * @returns boolean
 */
export function CorsairSetLedsColorsFlushBufferAsync(
  callback: Function,
): boolean;

/**
 * Function to set the current color for all CorsairLedColor's in an array
 *
 * asynchronously
 *
 * @param colors array with CorsairLedColor
 *
 * @param callback callback function
 *
 * @returns boolean
 */
export function CorsairSetLedsColorsAsync(
  colors: Array<CorsairLedColor>,
  callback: Function,
): boolean;

/**
 * Function to get an array with CorsairLed containing
 *
 * the position and ledId of the LED
 *
 * @returns Array<CorsairLed>
 */
export function CorsairGetLedPositions(): Array<CorsairLed>;

/**
 * Function to get an array with CorsairLed containing
 *
 * the position and ledId of the led for a specific
 *
 * device
 *
 * @param deviceIndex zero based device index
 */
export function CorsairGetLedPositionsByDeviceIndex(
  deviceIndex: number,
): Array<CorsairLed>;

/**
 * Function to get the ledId for a
 *
 * @param keyName key character
 *
 * @returns number
 */
export function CorsairGetLedIdForKeyName(keyName: string): number;

/**
 * Function to request explusive control
 *
 * @returns boolean
 */
export function CorsairRequestControl(): boolean;

/**
 * Function to release exclusive requested control
 *
 * @returns boolean
 */
export function CorsairReleaseControl(): boolean;

/**
 * Function to set the priority for the layer. The priority
 *
 * has to be between 0 and 127
 *
 * @param priority number
 *
 * @returns boolean
 */
export function CorsairSetLayerPriority(priority: number): boolean;

/**
 * Function to get the property for a device
 *
 * @param deviceIndex zero based device index
 *
 * @param propertyId number
 *
 * @returns object
 */
export function CorsairGetDeviceProperty(
  deviceIndex: number,
  propertyId: number,
): { value: boolean | number};

/**
 * Function to subscribe to events. The callback param gets
 *
 * called when an event occured
 *
 * @param callback callback function
 *
 * @returns boolean
 */
export function CorsairSubscribeForEvents(
  callback: (event: {
    id: 'macrokeydown' | 'macrokeyup' | 'deviceconnect' | 'devicedisconnect';
    deviceId: string;
  }) => void,
): boolean;

/**
 * Function to unsubscribe from events
 *
 * @returns boolean
 */
export function CorsairUnsubscribeFromEvents(): boolean;
