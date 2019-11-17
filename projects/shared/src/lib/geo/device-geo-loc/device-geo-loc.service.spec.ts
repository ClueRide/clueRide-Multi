import {DeviceGeoLocService} from './device-geo-loc.service';
import {TestBed} from '@angular/core/testing';

let toTest: DeviceGeoLocService;

describe('Device Geo-Loc Service', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be defined', () => {
    toTest = TestBed.get(DeviceGeoLocService);
    expect(toTest).toBeDefined();
  });

  // describe('checkGpsAvailability', () => {
  //
  //   it('should be defined', () => {
  //     expect(toTest.checkGpsAvailability).toBeDefined();
  //   });
  //
  //   it('should return position when GPS available', () => {
  //     /* setup data */
  //     const expected: Geolocation = {lat: 33.78, lon: -84.38};
  //     let actual: any;
  //     const positionSubject: Subject<Geolocation> = new Subject();
  //
  //     /* train mocks */
  //     spyOn(navigator.geolocation, 'getCurrentPosition').and.returnValue(
  //       positionSubject.asObservable()
  //     );
  //     positionSubject.next(expected);
  //
  //     /* make call */
  //     toTest.checkGpsAvailability().subscribe(
  //       (response) => {
  //         /* verify results */
  //         actual = response;
  //         expect(actual).toBe(expected);
  //       }
  //     );
  //
  //   });

    // it('should indicate GPS available when it is available', () => {
    //   /* setup data */
    //   const expected = {lat: 33.78, lon: -84.38};
    //   const positionSubject: Subject<any> = new Subject();
    //
    //   /* train mocks */
    //   spyOn(navigator.geolocation, 'getCurrentPosition').and.returnValue(
    //     positionSubject.asObservable()
    //   );
    //   positionSubject.next(expected);
    //
    //   /* make call */
    //   toTest.checkGpsAvailability().subscribe(
    //     () => {
    //       /* verify results */
    //       expect(toTest.hasGPS()).toBe(true);
    //     }
    //   );
    //
    // });

    // it('should indicate no GPS when it isn\'t available', () => {
    //   /* make call */
    //   toTest.checkGpsAvailability().subscribe(
    //     () => {
    //       /* verify results */
    //       expect(toTest.hasGPS()).toBe(false);
    //     }
    //   );

    // });

  // });

});
