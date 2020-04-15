import {Injectable} from '@angular/core';
import {
  GeolocationOptions,
  Geoposition
} from '@ionic-native/geolocation';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {
  Observable,
  Subject,
  Subscription
} from 'rxjs';

/**
 * Provides service for managing the GPS on this device.
 */
@Injectable({
  providedIn: 'root'
})
export class DeviceGeoLocService {
  /**
   * May want to make this configurable.
   */
  private geoLocOptions: GeolocationOptions = {
    timeout: 10000,
    enableHighAccuracy: true
  };

  /* Holds the ID of this instance's watch for later release. */
  private watchSubscription: Subscription;
  /* Records result of asynchronous attempt to read GPS. */
  private gpsAvailable = false;
  /* How clients receive the position GPS would be supplying. */
  private positionSubject: Subject<Geoposition>;
  /* In case we don't receive any more position updates, but we do have requests for that position. */
  private lastPosition: Geoposition;

  constructor(
    private geolocation: Geolocation,
  ) {
  }

  /**
   * Asynchronously check if this device is able to serve up it's position.
   */
  public checkGpsAvailability(): Observable<Geoposition> {
    console.log('2. Determining position sources');
    const availabilitySubject: Subject<Geoposition> = new Subject();
    this.geolocation.getCurrentPosition().then(
      (response) => {
        console.log('3. GPS available');
        this.gpsAvailable = true;
        this.lastPosition = response;
        availabilitySubject.next(response);
      }
    ).catch(
      (error) => {
        console.log(error);
        console.log('3. GPS not available');
        this.gpsAvailable = false;
        availabilitySubject.next(null);
      });
    return availabilitySubject.asObservable();
  }

  public getWatch(): Subject<Geoposition> {
    if (!this.hasGPS()) {
      throw new RangeError('Unable to request watch for device that doesn\'t support GPS');
    }

    if (!this.positionSubject) {
      this.positionSubject = new Subject();
      this.watchSubscription = this.geolocation.watchPosition(
        this.geoLocOptions
      ).subscribe(
        (response) => {
          this.positionSubject.next(response);
        },
        (error) => {
          console.log('getWatch(): unable to obtain position', error);
        },
      );
    }

    /* Send this in case we get more requests than we have unique positions. */
    if (this.lastPosition) {
      this.positionSubject.next(this.lastPosition);
    }

    return this.positionSubject;
  }

  public clearWatch() {
    this.watchSubscription.unsubscribe();
    this.positionSubject = undefined;
  }

  /**
   * Returns true if this device is able to use it's GPS.
   */
  public hasGPS(): boolean {
    return this.gpsAvailable;
  }

}
