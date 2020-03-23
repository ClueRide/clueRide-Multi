import {Injectable} from '@angular/core';
import {Geoposition} from '@ionic-native/geolocation';
import {
  Observable,
  ReplaySubject,
  Subject
} from 'rxjs';
import {DeviceGeoLocService} from '../device-geo-loc/device-geo-loc.service';

@Injectable({
  providedIn: 'root'
})
export class GeoLocService {

  public static readonly ATLANTA_GEOPOSITION: Geoposition = {
    coords: {
      latitude: 33.753,
      longitude: -84.390,
      accuracy: 0.0,
      altitude: null,
      altitudeAccuracy: null,
      heading: null,
      speed: null
    },
    timestamp: null
  };

  /** A Subject for Tethered Position; only instantiated if needed. */
  private tetheredPosition: Subject<Geoposition>;

  private tetheredFlag: boolean;
  private forceTether: boolean;
  private keepScheduling: boolean;

  constructor(
    private deviceGeoLocService: DeviceGeoLocService,
  ) {
    this.tetheredFlag = false;
    this.keepScheduling = false;
  }

  /**
   * This component needs some time after the platform is ready to
   * check the availability of the GPS -- and possibly confirm with
   * the user if the GPS may be used -- before allowing the use of
   * the position sources. The observable returned by this function
   * will provide an async response once the checks are completed and
   * this service is ready for use.
   *
   * @returns Observable of Geoposition which represents our position whether
   * it comes from this device's GPS or from a Tethered position (or another source).
   */
  public notifyWhenReady(): Observable<Geoposition> {
    const serviceReady: Subject<Geoposition> = new Subject();
    this.deviceGeoLocService.checkGpsAvailability().subscribe(
      (response) => {
        if (response) {
          serviceReady.next(response);
        } else {
          serviceReady.next(GeoLocService.ATLANTA_GEOPOSITION);
        }
      },
      () => {
        serviceReady.next(GeoLocService.ATLANTA_GEOPOSITION);
      }
    );
    return serviceReady.asObservable();
  }

  /**
   * Set this true if we want to always use the tether even if GPS
   * is available.
   */
  public forceUsingTether() {
    this.forceTether = true;
  }

  public useGpsWhenAvailable() {
    this.forceTether = false;
  }

  public isTethered(): boolean {
    return this.tetheredFlag;
  }

  /** Turn off watching the position -- however we're picking it up. */
  public clearWatch() {
    if (this.isTethered()) {
      this.stopMonitoringTether();
    } else {
      this.deviceGeoLocService.clearWatch();
    }
  }

  /**
   * Returns an observable that gives the current position when updated.
   * This will be sourced by one of two things:
   * <ul>
   *     <li>Observable against the native location of the device this is running on, or if it fails,
   *     <li>A tethered value that comes from the server for the user's session, or if it fails, a fake value.
   * </ul>
   */
  getPositionWatch(): Observable<Geoposition> {
    if (this.forceTether) {
      console.log('Forced Tether');
      return this.getTetheredPosition();
    } else {
      if (this.deviceGeoLocService.hasGPS()) {
        console.log('Able to use GPS');
        const devicePositionSubject: Subject<Geoposition> = this.deviceGeoLocService.getWatch();
        return devicePositionSubject.asObservable();
      } else {
        console.log('Unable to use GPS -- tethering');
        return this.getTetheredPosition();
      }
    }
  }

  private getTetheredPosition(): Observable<Geoposition> {
    if (!this.tetheredFlag) {
      this.tetheredPosition = new ReplaySubject();
      this.keepScheduling = true;
      this.tetheredFlag = true;
      this.startMonitoringTether();
    }
    return this.tetheredPosition.asObservable();
  }

  private startMonitoringTether(): void {
    // Temporary until we get another position source.
    this.tetheredPosition.next(GeoLocService.ATLANTA_GEOPOSITION);

    // TODO: FEC-47 Replace this with the SSE Tether service.
    // let monitorPromise = this.restangular.one("tether/dev").get().toPromise();
    // monitorPromise.then(
    //   (latLon) => {
    //     let geoPosition = buildGeoPositionFromLatLon(latLon);
    //     this.tetheredPosition.next(geoPosition);
    //     if (this.keepScheduling) {
    //       setTimeout(() => {this.startMonitoringTether()}, 1500);
    //     }
    //   }
    // ).catch(
    //   (error) => {
    //     console.log(error);
    //   }
    // );
  }

  private stopMonitoringTether() {
    this.keepScheduling = false;
  }

}
