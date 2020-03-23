import {GeoLocService} from './geo-loc';
import {DeviceGeoLocService} from '../device-geo-loc/device-geo-loc.service';
import {Subject} from 'rxjs';
import {Geoposition} from '@ionic-native/geolocation';

let toTest: GeoLocService;
let deviceGeoLocService: DeviceGeoLocService;
const restangularService: any = {
  one() {
    return {
      get() {}
    };
  }
};

describe('Geo-Location', () => {

  beforeEach(() => {
    deviceGeoLocService = new DeviceGeoLocService();

    toTest = new GeoLocService(
      deviceGeoLocService
    );

  });

  it('should be defined', () => {
    expect(toTest).toBeDefined();
  });

  describe('injections', () => {

    it('should be defined', () => {
      expect(deviceGeoLocService).toBeDefined();
    });

  });

  describe('Initialization', () => {

    it('should provide signal (and a position) when available for use', () => {
      /* setup data */
      let actual: Geoposition;
      const serviceReadySubject: Subject<Geoposition> = new Subject();
      const expected = GeoLocService.ATLANTA_GEOPOSITION;

      /* train mocks */
      spyOn(deviceGeoLocService, 'checkGpsAvailability').and.returnValue(serviceReadySubject.asObservable());

      /* make call */
      toTest.notifyWhenReady().subscribe(
        (response) => {
          actual = response;
        },
        () => {
          // eat failure within test; we're checking the result
        }
      );

      /* verify results */
      expect(actual).not.toBeDefined();
      serviceReadySubject.next(expected);
      expect(actual).toBe(expected);

    });

  });

  describe('Resolving which location source to use', () => {

    it('should read from GPS when it is available', () => {
      /* train mocks */
      spyOn(deviceGeoLocService, 'hasGPS').and.returnValue(true);

      /* make call */
      toTest.getPositionWatch();

      /* verify results */
      expect(toTest.isTethered()).toBeFalsy();

    });

    it('should read from Tethered when GPS unavailable', () => {
      /* train mocks */
      const positionSubject: Subject<any> = new Subject();
      spyOn(deviceGeoLocService, 'hasGPS').and.returnValue(false);
      spyOn(restangularService, 'one').and.returnValue({
        get() {
          return positionSubject;
        }
      });

      /* make call */
      toTest.getPositionWatch();

      /* verify results */
      expect(toTest.isTethered()).toBeTruthy();

    });

    it('should run tethered when overridden', () => {
      /* train mocks */
      const positionSubject: Subject<any> = new Subject();
      spyOn(deviceGeoLocService, 'hasGPS').and.returnValue(true);
      spyOn(restangularService, 'one').and.returnValue({
        get() {
          return positionSubject;
        }
      });

      /* make call */
      toTest.forceUsingTether();
      toTest.getPositionWatch();

      /* verify results */
      expect(toTest.isTethered()).toBeTruthy();

    });

    it('should not miss single unchanging point', () => {
      /* setup data */
      const expected = {lat: 33.78, lon: -84.38};
      const positionSubject: Subject<any> = new Subject();
      let actual: any;

      /* train mocks */
      spyOn(deviceGeoLocService, 'checkGpsAvailability').and.returnValue(
        positionSubject.asObservable()
      );
      spyOn(restangularService, 'one').and.returnValue({
        get() {
          return positionSubject;
        }
      });

      /* make call */
      toTest.notifyWhenReady().subscribe(
        (response) => {
              actual = response;
        }
      );
      positionSubject.next(expected);

      /* verify results */
      expect(actual).toBe(expected);

    });

    it('should give us Observable in any case', () => {
      /* train mocks */
      const positionSubject: Subject<any> = new Subject();
      spyOn(deviceGeoLocService, 'checkGpsAvailability').and.returnValue(
        positionSubject.asObservable()
      );
      spyOn(restangularService, 'one').and.returnValue({
        get() {
          return positionSubject;
        }
      });

      /* make call */
      const positionObservable = toTest.getPositionWatch();

      /* verify results */
      expect(positionObservable).toBeDefined();
      expect(positionObservable.subscribe).toBeDefined();
      positionObservable.subscribe((actual) => {
        expect(actual.timestamp).toBeDefined();
        expect(actual.timestamp).toBeFalsy();
      });
    });

  });

  describe('Notify when Ready', () => {

    it('should not return until device can be polled for position', () => {
      /* setup data */
      const positionSubject: Subject<any> = new Subject();
      let actual: any;

      /* train mocks */
      spyOn(deviceGeoLocService, 'checkGpsAvailability').and.returnValue(
        positionSubject.asObservable()
      );

      /* make call */
      toTest.notifyWhenReady().subscribe(
        (response) => {
          actual = response;
        }
      );

      /* verify results */
      expect(actual).not.toBeDefined();
    });

    it('should return device position when GPS available', () => {
      /* setup data */
      let actual: any;
      const expected = {lat: 33.78, lon: -84.38};
      const positionSubject: Subject<any> = new Subject();

      /* train mocks */
      spyOn(deviceGeoLocService, 'checkGpsAvailability').and.returnValue(
        positionSubject.asObservable()
      );
      positionSubject.next(expected);

      /* make call */
      toTest.notifyWhenReady().subscribe(
        (response) => {
          actual = response;
          /* verify results */
          expect(actual).toBe(expected);
        }
      );

    });

    it('should return default position when GPS not available', () => {
      /* setup data */
      let actual: any;
      const expected = GeoLocService.ATLANTA_GEOPOSITION;
      const positionSubject: Subject<any> = new Subject();

      /* train mocks */
      spyOn(deviceGeoLocService, 'checkGpsAvailability').and.returnValue(
        positionSubject.asObservable()
      );

      /* make call */
      toTest.notifyWhenReady().subscribe(
        (response) => {
          actual = response;
        }
      );
      positionSubject.error('timeout looking for device position');

      /* verify results */
      expect(actual).toEqual(expected);

    });


    it('should return default position when device returns null', () => {
      /* setup data */
      let actual: any;
      const expected = GeoLocService.ATLANTA_GEOPOSITION;
      const positionSubject: Subject<any> = new Subject();

      /* train mocks */
      spyOn(deviceGeoLocService, 'checkGpsAvailability').and.returnValue(
        positionSubject.asObservable()
      );

      /* make call */
      toTest.notifyWhenReady().subscribe(
        (response) => {
          actual = response;
        }
      );
      positionSubject.next(null);

      /* verify results */
      expect(actual).toEqual(expected);

    });

  });

  describe('Watching Tether', () => {

    it('should receive position information from Team\'s Guide (via server)', () => {

    });

  });

  describe('Watching internal GPS', () => {
    it('should receive position from device', () => {

    });
  });

  describe('Watch management', () => {

    it('should open a watch when starting', () => {

    });

    it('should close the watch when done', () => {

    });

  });

});
