import {
  Component,
  Input,
  OnDestroy,
  OnInit
} from '@angular/core';
import {Platform} from '@ionic/angular';
import {
  Observable,
  Subscription
} from 'rxjs';
// TODO: CI-33 Replace with `navigator.compass`
// import {
//   DeviceOrientation,
//   DeviceOrientationCompassHeading,
//   DeviceOrientationCompassOptions
// } from '@ionic-native/device-orientation';
import {PlatformStateService} from '../state/platform/platform-state.service';
import {Geoposition} from '@ionic-native/geolocation';

/**
 * Generated class for the HeadingComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */

// TODO: CI-33 Replace with `navigator.compass`
// const headingOptions: DeviceOrientationCompassOptions = {
//   frequency: 800
// };

@Component({
  selector: 'cr-heading',
  template: ''
})
export class HeadingComponent implements OnInit, OnDestroy {

  @Input() positionObservable: Observable<Geoposition>;

  subscription: Subscription;
  deviceHasCompass: boolean;

  private lastHeading: number;

  constructor(
    // TODO: CI-33 Replace with `navigator.compass`
    // private deviceOrientation: DeviceOrientation,
    private platform: Platform,
    private platformStateService: PlatformStateService,
  ) {
  }

  /** This prepares the use of the compass, but waits to find out which position to follow from the client of this component. */
  ngOnInit() {
    console.log('HeadingComponent: ngOnInit()');
    /* One of three Platform Ready calls. */
    this.platform.ready().then(
      () => {
        console.log('HeadingComponent: Platform Ready');

        /* Validate input parameters. */
        if (!this.positionObservable) {
          console.error('HeadingComponent: Position Observable not given');
          return;
        }

        this.checkCompassAvailability();
      }
    );
  }

  /**
   * We find out if we have a compass by attempting to get a reading.
   *
   * This is exposed as public for testing reasons: it's not easy
   * to mock the platform ready which is when the check can be performed.
   */
  public checkCompassAvailability(): void {
    this.deviceHasCompass = false;
    if (this.platformStateService.isNativeMode()) {
// TODO: CI-33 Replace with `navigator.compass`
//       this.deviceOrientation.getCurrentHeading().then(
//         (data: DeviceOrientationCompassHeading) => {
//           this.deviceHasCompass = true;
//           this.lastHeading = data.trueHeading;
//         }
//       ).catch(
//         (error) => {
//           console.log('Ionic Native not available: ' + error);
//         }
//       );
//     } else {
//       console.log('Heading Component: Ionic Native not available in Local');
    }
  }



  private addHeadingSubscription() {
    if (this.deviceHasCompass) {
      console.log('Adding Subscription to Compass Heading');
// TODO: CI-33 Replace with `navigator.compass`
//       this.subscription = this.deviceOrientation.watchHeading(headingOptions).subscribe(
//         (data: DeviceOrientationCompassHeading) => this.updateHeadingMarkerHeading(data)
//       );
    }
  }

  /**
   * Given a Compass Heading, set the heading of the icon.
   *
   * @param compassHeading CompassHeading object whose 'trueHeading' property provides a heading in degrees from
   * north: (N: 0, E: 90, S: 180, W:270).
   */
// TODO: CI-33 Replace with `navigator.compass`
//   private updateHeadingMarkerHeading(compassHeading: DeviceOrientationCompassHeading) {
//     if (compassHeading.trueHeading) {
//       this.lastHeading = compassHeading.trueHeading;
//     }
//   }





  ngOnDestroy() {
    // this.releaseHeadingMarker();
    this.subscription.unsubscribe();
  }

  /**
   * When closing the map, the marker should be shutdown -- including
   * its subscription to the compass.
   */
  // public releaseHeadingMarker() {
  //   if (this.deviceHasCompass && this.subscription) {
  //     this.subscription.unsubscribe();
  //   }
  // }
}
