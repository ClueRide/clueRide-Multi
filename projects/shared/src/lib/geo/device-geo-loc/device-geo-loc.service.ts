import {Injectable} from '@angular/core';
import {GeolocationOptions, Geoposition} from '@ionic-native/geolocation';
import {Observable} from 'rxjs';
import {Subject} from 'rxjs';

/**
 * Created by jett on 12/02/17.
 * Provides service for managing the GPS on this device.
 */
@Injectable()
export class DeviceGeoLocService {
  /**
   * May want to make this configurable.
   */
  private geoLocOptions: GeolocationOptions = {
    timeout: 10000,
    enableHighAccuracy: true
  };

  /* Holds the ID of this instance's watch for later release. */
  private watchId: number;
  /* Records result of asynchronous attempt to read GPS. */
  private gpsAvailable = false;
  /* How clients receive the position GPS would be supplying. */
  private positionSubject: Subject<Geoposition>;
  /* In case we don't receive any more position updates, but we do have requests for that position. */
  private lastPosition: Geoposition;

  constructor(
  ) {
  }

  /**
   * Asynchronously check if this device is able to serve up it's position.
   */
  public checkGpsAvailability(): Observable<Geoposition> {
    console.log('2. Determining position sources');
    const availabilitySubject: Subject<Geoposition> = new Subject();
    navigator.geolocation.getCurrentPosition(
      (response) => {
        console.log('3. GPS available');
        this.gpsAvailable = true;
        this.lastPosition = response;
        availabilitySubject.next(response);
      },
      (error) => {
        console.log(error);
        console.log('3. GPS not available');
        this.gpsAvailable = false;
        availabilitySubject.next(null);
      },
      this.geoLocOptions
    );
    return availabilitySubject.asObservable();
  }

  public getWatch(): Subject<Geoposition> {
    if (!this.hasGPS()) {
      throw new RangeError('Unable to request watch for device that doesn\'t support GPS');
    }

    if (!this.positionSubject) {
      this.positionSubject = new Subject();
      this.watchId = navigator.geolocation.watchPosition(
        (response) => {
          this.positionSubject.next(response);
        },
        (error) => {},
        this.geoLocOptions
      );
    }

    /* Send this in case we get more requests than we have unique positions. */
    if (this.lastPosition) {
      this.positionSubject.next(this.lastPosition);
    }

    return this.positionSubject;
  }

  public clearWatch() {
    navigator.geolocation.clearWatch(this.watchId);
    this.positionSubject = undefined;
  }

  /**
   * Returns true if this device is able to use it's GPS.
   */
  public hasGPS(): boolean {
    return this.gpsAvailable;
  }

}
