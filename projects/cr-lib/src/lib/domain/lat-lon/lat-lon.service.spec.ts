import {Geoposition} from '@ionic-native/geolocation';
import * as L from 'leaflet';
import {LatLon} from './lat-lon';
import {LatLonService} from './lat-lon.service';

describe('LatLonService', () => {
  let toTest: LatLonService;
  const LAT = 81.0;
  const LON = 34.0;
  const geoPositionValue: Geoposition = {
    coords: {
      latitude: LAT,
      longitude: LON,
      accuracy: 0.0,
      altitude: null,
      altitudeAccuracy: null,
      heading: null,
      speed: null
    },
    timestamp: null
  };

  beforeEach(() => {
    toTest = new LatLonService();
  });

  it('should create', () => {
    expect(toTest).toBeTruthy();
  });

  describe('toGeoPosition', () => {

    it('should accept LatLon', () => {
      /* setup data */
      const geoPositionExpected = geoPositionValue;
      const latLon: LatLon = {
        id: null,
        lat: LAT,
        lon: LON
      };

      /* make call */
      const actualGeoposition = toTest.toGeoPosition(latLon);

      /* verify results */
      expect(actualGeoposition).toEqual(geoPositionExpected);
    });

    it('should accept LatLng', () => {
      /* setup data */
      const geoPositionExpected = geoPositionValue;
      const latLng: L.LatLng = new L.LatLng(LAT, LON);

      /* make call */
      const actualGeoposition = toTest.toGeoPosition(latLng);

      /* verify results */
      expect(actualGeoposition).toEqual(geoPositionExpected);
    });

    it('should accept [] array', () => {
      /* setup data */
      const geoPositionExpected = geoPositionValue;
      const latLng = [LAT, LON];

      /* make call */
      const actualGeoposition = toTest.toGeoPosition(latLng);

      /* verify results */
      expect(actualGeoposition).toEqual(geoPositionExpected);
    });

  });

  describe('toLatLon', () => {

    it('should accept Geoposition', () => {
      /* setup data */
      const latLonExpected: LatLon = {
        id: null,
        lat: LAT,
        lon: LON
      };

      /* make call */
      const actualLatLon = toTest.toLatLon(geoPositionValue);

      /* verify results */
      expect(actualLatLon).toEqual(latLonExpected);
    });

  });

  describe('toLatLng', () => {

    it('should accept Geoposition', () => {
      /* setup data */
      const latLngExpected: L.LatLng = new L.LatLng(LAT, LON);

      /* make call */
      const actualLatLng = toTest.toLatLng(geoPositionValue);

      /* verify results */
      expect(actualLatLng).toEqual(latLngExpected);
    });

    it('should accept LatLon', () => {
      /* setup data */
      const latLngExpected: L.LatLng = new L.LatLng(LAT, LON);
      const latLonValue: LatLon = {
        id: null,
        lat: LAT,
        lon: LON
      };

      /* make call */
      const actualLatLng = toTest.toLatLng(latLonValue);

      /* verify results */
      expect(actualLatLng).toEqual(latLngExpected);
    });

  });

});
