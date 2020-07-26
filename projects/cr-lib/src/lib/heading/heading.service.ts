import {Injectable} from '@angular/core';
import * as L from 'leaflet';
import {Geoposition} from '@ionic-native/geolocation';
import {
  Observable,
  Subscription
} from 'rxjs';
import {LatLonService} from '../domain/lat-lon/lat-lon.service';

/** Marker size and anchor are common across all images. */
const commonIconSize: L.PointExpression = [20, 50];
const commonIconAnchor: L.PointExpression = [10, 25];

@Injectable({
  providedIn: 'root'
})
export class HeadingService {

  readonly hereIAmIcon: L.Icon;
  readonly hereIAmHeadingIcon: L.Icon;
  readonly hereIAmTetheredIcon: L.Icon;
  readonly hereIAmHeadingTetheredIcon: L.Icon;

  private headingMarker: L.Marker;
  private subscription: Subscription;

  /* TODO: CI-33 */
  private deviceHasCompass: boolean = false;
  private lastHeading: number = 0.0;

  constructor(
    private latLonService: LatLonService,
  ) {
    /**
     * This particular icon is used to show direction the device is facing.
     * See README.md for more details.
     */
    this.hereIAmHeadingIcon = HeadingService.iconFromImage(
      'https://www.clueride.com/wp-content/uploads/2017/07/hereIAm-heading.png',
    );

    this.hereIAmIcon = HeadingService.iconFromImage(
      'https://www.clueride.com/wp-content/uploads/2017/07/hereIAm.png',
    );

    this.hereIAmTetheredIcon = HeadingService.iconFromImage(
      'https://www.clueride.com/wp-content/uploads/2017/07/hereIAm-tethered.png',
    );

    this.hereIAmHeadingTetheredIcon = HeadingService.iconFromImage(
      'https://www.clueride.com/wp-content/uploads/2017/07/hereIAm-heading-tethered.png',
    );

  }

  /* Helper function for turning image into icon for a marker. */
  static iconFromImage(iconUrl: string): L.Icon {
    return L.icon({
      iconUrl,
      iconSize: commonIconSize,
      iconAnchor: commonIconAnchor
    });
  }

  /** This is called once the map has been told an initial position; the one that is passed here. */
  public initializeHeadingMarker(
    initialPosition: Geoposition,
    positionObservable: Observable<Geoposition>
  ): L.Marker {
    /* Lazy init. */
    if (!this.headingMarker) {
      console.log('HeadingComponent: Setting up Heading Marker');
      this.setupHeadingMarker(initialPosition);

      /* Replacement for the ionViewWillEnter(); don't subscribe until the map has gotten going. */
      this.subscription = positionObservable.subscribe(
        (position: Geoposition) => this.updateLocation(position)
      );

      /* TODO: CI-33. */
      // this.addHeadingSubscription();
    } else {
      console.log('HeadingComponent: Using existing headingMarker:', this.headingMarker);
    }
    return this.headingMarker;
  }

  private setupHeadingMarker(
    position: Geoposition,
  ) {
    this.reportCompass();

    if (this.deviceHasCompass) {
      console.log('HeadingComponent: setting heading-based marker');
      this.headingMarker = L.marker(
        this.latLonService.toLatLng(position),
        {
          icon: this.hereIAmHeadingIcon,
          rotationAngle: 0.0,
          rotationOrigin: 'center center'
        } as any
      );
    } else {
      console.log('HeadingComponent: setting direction-less marker');
      this.headingMarker = L.marker(
        this.latLonService.toLatLng(position),
        {
          icon: this.hereIAmIcon
        }
      );
    }
  }

  private reportCompass(): void {
    if (this.deviceHasCompass) {
      console.log('Device has a compass');
    } else {
      console.log('Device has no compass');
    }
  }

  /**
   * Given a set of coordinates, update the location of the Marker.
   * Since we're changing the CSS on the marker, it's a good time to
   * reflect the orientation of the marker as well.
   * @param position -- Geoposition instance telling us where the marker should go.
   */
  public updateLocation(position: Geoposition) {
    /* While updating the location of the marker ... */
    this.updateHeadingMarkerLocation(position);
    if (this.deviceHasCompass) {
      this.renderMarkerHeading();
    }
  }
  /**
   * This implementation uses CSS on the marker's icon instance to add the rotateZ() transform.
   */
  private renderMarkerHeading() {
    let genericMarker: any = this.headingMarker;

    if (genericMarker._icon) {
      genericMarker._icon.style.transformOrigin = 'center center';
      genericMarker._icon.style.transform += ' rotateZ(' + this.lastHeading + 'deg)';
    }
  }

  private updateHeadingMarkerLocation(position: Geoposition) {
    if (!this.headingMarker) {
      console.warn('Did we lose the marker?');
    }

    if (position && this.headingMarker) {
      this.headingMarker.setLatLng(
        this.latLonService.toLatLng(position)
      );
    }
  }

  public releaseHeadingMarker() {
    this.subscription.unsubscribe();
  }

}
