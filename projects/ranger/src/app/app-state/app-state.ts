import {PositionSourceType} from 'cr-lib';

/** Defines the items that show up on the Status Page. */
export class AppState {
  registeredAs = ' ... ';
  registrationState = '';
  isRunningBrowser = true;
  positionSource: PositionSourceType = PositionSourceType.UNDETERMINED;
  cacheState = ' ... ';
  locationCount = 0;
  readyToEdit = false;
}

