import {Injectable} from '@angular/core';
import {Platform} from '@ionic/angular';

/**
 * Holds status of the Platform.
 */
@Injectable()
export class PlatformStateService {

  constructor(
    private platform: Platform,
  ) {
    console.log('PlatformState construction-time platforms:', this.platform.platforms());
    this.platform.ready()
      .then(
        () => {console.log('PlatformState device ready platforms:', this.platform.platforms()); }
      ).catch(
      (error) => {throw error; }
    );
  }

  /**
   * Uses the ionic Platform to tell us if we have access to Native functionality on this platform.
   */
  public isNativeMode(): boolean {
    return this.platform.is('cordova');
  }

}
