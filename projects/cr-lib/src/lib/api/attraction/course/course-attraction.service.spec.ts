import {
  HttpClientTestingModule,
  HttpTestingController,
  TestRequest
} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {BASE_URL} from '../../../auth/header/auth-header.service';
import {AttractionMock} from '../attraction-mock';

import {CourseAttractionService} from './course-attraction.service';
import {LatLonService} from '../../../domain/lat-lon/lat-lon.service';
import {PoolMarkerService} from '../../../marker/pool/pool-marker.service';

/* Populate a set of Attractions to serve as the Course. */
const attraction1 = AttractionMock.createAttractionMock(1);
const attraction2 = AttractionMock.createAttractionMock(2);
const attraction3 = AttractionMock.createAttractionMock(3);
const attraction4 = AttractionMock.createAttractionMock(4);
const attraction5 = AttractionMock.createAttractionMock(5);
const attractionsForCourse = [
  attraction1,
  attraction2,
  attraction3,
  attraction4,
  attraction5,
];

const latLonSpy = jasmine.createSpyObj('LatLonService', ['getAllCategories']);
const poolMarkerSpy = jasmine.createSpyObj('PoolMarkerService', ['getAllCategories']);

describe('CourseAttractionService', () => {
  let toTest: CourseAttractionService;
  let httpClientSpy: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        CourseAttractionService,
        { provide: LatLonService, useValue: latLonSpy },
        { provide: PoolMarkerService, useValue: poolMarkerSpy },
      ]
    });

    toTest = TestBed.get(CourseAttractionService);
    httpClientSpy = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(toTest).toBeTruthy();
  });

  describe('loadCourseAttractions', () => {

    it('should be defined', () => {
      expect(toTest.loadCourseAttractions).toBeDefined();
    });

    it('should populate its cache when invoked', (done) => {
      /* make call */
      toTest.loadCourseAttractions().subscribe(
        (result) => {
          expect(result).toBeTruthy();
          done();
        }
      );

      const attractionRequest: TestRequest = httpClientSpy.expectOne(BASE_URL + 'location/active');
      attractionRequest.flush(attractionsForCourse);

      /* verify results */
      httpClientSpy.verify();
      const actual = toTest.getAllCourseAttractions();
      expect(actual).toEqual(attractionsForCourse);
      expect(toTest.getAttraction(1)).toEqual(attraction1);
      expect(toTest.getAttraction(2)).toEqual(attraction2);
      expect(toTest.getAttraction(3)).toEqual(attraction3);
      expect(toTest.getAttraction(4)).toEqual(attraction4);
      expect(toTest.getAttraction(5)).toEqual(attraction5);
    });

  });

  describe('getOutingPresentableSubset', () => {

    it('should be defined', () => {
      expect(toTest.getOutingPresentableSubset).toBeDefined();
    });

    it('should provide subset of 1 when last index is -1', (done) => {
      /* Setup Cache within service under test. */
      toTest.loadCourseAttractions().subscribe(
        (result) => {
          expect(result).toBeTruthy();
          done();
        }
      );

      const attractionRequest: TestRequest = httpClientSpy.expectOne(BASE_URL + 'location/active');
      attractionRequest.flush(attractionsForCourse);

      /* make call */
      const actual = toTest.getOutingPresentableSubset(-1);

      /* verify results */
      expect(actual.length).toEqual(1);
      expect(actual).toEqual(attractionsForCourse.slice(0, 1));
    });

    it('should mark the last two attractions as \'last\' and \'current\'', (done) => {
      /* Setup Cache within service under test. */
      toTest.loadCourseAttractions().subscribe(
        (result) => {
          expect(result).toBeTruthy();
          done();
        }
      );

      const attractionRequest: TestRequest = httpClientSpy.expectOne(BASE_URL + 'location/active');
      attractionRequest.flush(attractionsForCourse);

      /* make call */
      const actual = toTest.getOutingPresentableSubset(2);

      /* verify results */
      expect(actual[2].isCurrent).toBeTruthy();
      expect(actual[2].isLast).toBeFalsy();
      expect(actual[3].isLast).toBeTruthy();
      expect(actual[3].isCurrent).toBeFalsy();
    });

  });

  describe('getAllCourseAttractions', () => {

    it('should be defined', () => {
      expect(toTest.getAllCourseAttractions).toBeDefined();
    });

    it('should retrieve the same set of attractions that were provided by the Course', (done) => {
      /* make call */
      toTest.loadCourseAttractions().subscribe(
        (result) => {
          expect(result).toBeTruthy();
          done();
        }
      );

      const attractionRequest: TestRequest = httpClientSpy.expectOne(BASE_URL + 'location/active');
      attractionRequest.flush(attractionsForCourse);

      /* verify results */
      httpClientSpy.verify();
      const actual = toTest.getAllCourseAttractions();
      expect(actual).toEqual(attractionsForCourse);
      expect(toTest.getAttraction(1)).toEqual(attraction1);
    });

  });

  describe('getAttraction', () => {

    it('should be defined', () => {
      expect(toTest.getAttraction).toBeDefined();
    });

  });

});
