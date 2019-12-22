import {Component, OnDestroy, OnInit} from '@angular/core';
import {Platform} from '@ionic/angular';
import {icon, L, marker, PointExpression} from 'leaflet';
import {Subscription} from 'rxjs';
// TODO: CI-33 Replace with `navigator.compass`
// import {
//   DeviceOrientation,
//   DeviceOrientationCompassHeading,
//   DeviceOrientationCompassOptions
// } from '@ionic-native/device-orientation';
import {PlatformStateService} from '../state/platform/platform-state.service';

/**
 * Generated class for the HeadingComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */

/** Marker size and anchor are common across all images. */
const commonIconSize: PointExpression = [20, 50];
const commonIconAnchor: PointExpression = [10, 25];

// TODO: CI-33 Replace with `navigator.compass`
// const headingOptions: DeviceOrientationCompassOptions = {
//   frequency: 800
// };

@Component({
  selector: 'cr-heading',
  template: ''
})
export class HeadingComponent implements OnInit, OnDestroy {

  constructor(
    // TODO: CI-33 Replace with `navigator.compass`
    // private deviceOrientation: DeviceOrientation,
    private platform: Platform,
    private platformStateService: PlatformStateService,
  ) {

    /**
     * This particular icon is used to show direction the device is facing.
     * See README.md for more details.
     */
    this.hereIAmIcon = HeadingComponent.iconFromImage(
      'https://www.clueride.com/wp-content/uploads/2017/07/hereIAm.png',
    );

    this.hereIAmHeadingIcon = HeadingComponent.iconFromImage(
      'https://www.clueride.com/wp-content/uploads/2017/07/hereIAm-heading.png',
    );

    this.hereIAmTetheredIcon = HeadingComponent.iconFromImage(
      'https://www.clueride.com/wp-content/uploads/2017/07/hereIAm-tethered.png',
    );

    this.hereIAmHeadingTetheredIcon = HeadingComponent.iconFromImage(
      'https://www.clueride.com/wp-content/uploads/2017/07/hereIAm-heading-tethered.png',
    );
  }
  subscription: Subscription;
  deviceHasCompass: boolean;

  readonly hereIAmIcon: L.Icon;
  readonly hereIAmHeadingIcon: L.Icon;
  private hereIAmTetheredIcon: L.Icon;
  private hereIAmHeadingTetheredIcon: L.Icon;
  private headingMarker: any;
  private lastHeading: number;

  static iconFromImage(iconUrl: string): L.Icon {
    return icon({
      iconUrl,
      iconSize: commonIconSize,
      iconAnchor: commonIconAnchor
    });
  }

  ngOnInit() {
    console.log('HeadingComponent: ngOnInit()');
    /* One of three Platform Ready calls. */
    this.platform.ready().then(
      () => {
        console.log('HeadingComponent: Platform Ready');
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

  public getHeadingMarker(): L.Marker {
    const position = [0.0, 0.0];
    if (!this.headingMarker) {
      this.setupHeadingMarker(position);
    }
    this.addHeadingSubscription();
    return this.headingMarker;
  }

  private setupHeadingMarker(
    position,
  ) {
    this.reportCompass();
    if (this.deviceHasCompass) {
      this.headingMarker = marker(
        position,
        {
          icon: this.hereIAmHeadingIcon,
          rotationAngle: 0.0,
          rotationOrigin: 'center center'
        } as any
      );
    } else {
      this.headingMarker = marker(
        position,
        {
          icon: this.hereIAmIcon
        }
      );
    }
  }

  private reportCompass() {
    if (this.deviceHasCompass) {
      console.log('Device has a compass');
    } else {
      console.log('Device has no compass');
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

  /**
   * Given a set of coordinates, update the location of the Marker.
   * Since we're changing the CSS on the marker, it's a good time to
   * reflect the orientation of the marker as well.
   * @param coordinates -- see TODO below.
   */
  // TODO: Not clear we need each of these type definitions. We do need to accept something with marker heading or not.
  public updateLocation(coordinates: string | L.Point | Coordinates) {
    console.log('Heading.updateLocation() invoked');
    /* While updating the location of the marker ... */
    this.updateHeadingMarkerLocation(coordinates);
    if (this.deviceHasCompass) {
      this.renderMarkerHeading();
    }
  }

  /**
   * This implementation uses CSS on the marker's icon instance to add the rotateZ() transform.
   */
  private renderMarkerHeading() {
    if (this.headingMarker._icon) {
      this.headingMarker._icon.style.transformOrigin = 'center center';
      this.headingMarker._icon.style.transform += ' rotateZ(' + this.lastHeading + 'deg)';
    }
  }

  private updateHeadingMarkerLocation(p) {
    if (p) {
      this.headingMarker.setLatLng([
        p.latitude,
        p.longitude
      ]);
    }
  }

  ngOnDestroy() {
    this.releaseHeadingMarker();
  }

  /**
   * When closing the map, the marker should be shutdown -- including
   * its subscription to the compass.
   */
  public releaseHeadingMarker() {
    if (this.deviceHasCompass && this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
