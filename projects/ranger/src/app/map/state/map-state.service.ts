import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MapStateService {

  /* May want subjects for these values. */
  private showLatLon = true;
  private showCrosshairs = false;

  constructor() {
    /* Defaults to on, but may want to eventually persist this state. */
    this.showCrosshairs = true;
    this.showLatLon = true;
  }

  /** Toggles the showCrosshairs state and returns the new state. */
  settingsToggleCrosshairs(): boolean {
    this.showCrosshairs = !this.showCrosshairs;
    return this.showCrosshairs;
  }

  /** Toggles the showLatLonView state and returns the new state. */
  settingsToggleViewLatLon(): boolean {
    this.showLatLon = !this.showLatLon;
    return this.showLatLon;
  }

}
