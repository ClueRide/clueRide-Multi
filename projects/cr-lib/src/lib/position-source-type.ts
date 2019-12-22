/**
 * Defines the sources of Location information.
 * TETHERED and DEVICE_GPS both produce Geoposition instances which may carry heading information.
 * MAP_DRAG originates from a LatLon that needs to be translated into Geoposition (without heading).
 */
export enum PositionSourceType {
  UNDETERMINED = 'UNDETERMINED',   // Haven't yet sorted out which one we'll want to try using.
  USER_DECLINED = 'USER_DECLINED',  // Can force either TETHERED or MAP_DRAG.
  TETHERED = 'TETHERED',
  DEVICE_GPS = 'DEVICE_GPS',
  MAP_DRAG = 'MAP_DRAG',
}
