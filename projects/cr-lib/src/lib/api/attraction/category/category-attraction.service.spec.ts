import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {
  Observable,
  Subject
} from 'rxjs';
import {LocTypeMock} from '../../loc-type/loc-type-mock';
import {Attraction} from '../attraction';
import {AttractionMock} from '../attraction-mock';
import {AttractionService} from '../attraction.service';

import {CategoryAttractionService} from './category-attraction.service';

/* Static data instances. */
const attraction1 = AttractionMock.createAttractionMock(1);
const attraction2 = AttractionMock.createAttractionMock(2);
const attraction3 = AttractionMock.createAttractionMock(3);
const attraction4 = AttractionMock.createAttractionMock(4);
const attraction5 = AttractionMock.createAttractionMock(5);

const locType1 = LocTypeMock.createLocType(attraction1.locationTypeId, 1);
const locType2 = LocTypeMock.createLocType(attraction2.locationTypeId, 1);
const locType3 = LocTypeMock.createLocType(attraction3.locationTypeId, 1);
const locType4 = LocTypeMock.createLocType(attraction4.locationTypeId, 2);
const locType5 = LocTypeMock.createLocType(attraction5.locationTypeId, 3);

attraction1.locationType = locType1;
attraction2.locationType = locType2;
attraction3.locationType = locType3;
attraction4.locationType = locType4;
attraction5.locationType = locType5;

const allLocTypes = [
  locType1,
  locType2,
  locType3,
  locType4,
  locType5
];

const allAttractions = [
  attraction1,
  attraction2,
  attraction3,
  attraction4,
  attraction5
];

/* Mocked Services. */
const attractionSpy = jasmine.createSpyObj('AttractionService', ['buildAttractionMap']);
const locationSpy = jasmine.createSpyObj('LocationService', ['nearest']);
const locTypeSpy = jasmine.createSpyObj('LocTypeService', ['getById']);

describe('CategoryAttractionService', () => {
  let toTest: CategoryAttractionService;
  let httpMock;
  let attractionService;

  beforeEach(() => {
    TestBed.configureTestingModule( {
      providers: [
        CategoryAttractionService
      ],
      imports: [
        HttpClientTestingModule
      ]
    });

    attractionService = TestBed.get(AttractionService);
    toTest = new CategoryAttractionService(
      attractionService,
      locationSpy,
      locTypeSpy
    );

    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(toTest).toBeTruthy();
  });

  describe('loadAllAttractions', () => {

    it('should be defined', () => {
      expect(toTest.loadAllAttractions).toBeDefined();
    });

    it('should populate cache with attractions provided by LocationService', (done) => {
      /* train mocks */
      const nearestSubject: Subject<Attraction[]> = new Subject<Attraction[]>();
      locationSpy.nearest = jasmine.createSpy('nearest').and.returnValue(nearestSubject);
      locTypeSpy.getById = jasmine.createSpy('getById').and.callFake(
        (id) => {
          return allLocTypes[id - 11];
        }
      );
      spyOn(attractionService, 'buildAttractionMap').and.callThrough();

      /* make call */
      const loadObservable: Observable<boolean> = toTest.loadAllAttractions();

      /* verify results */
      loadObservable.subscribe(
        (result) => {
          expect(result).toBeTruthy();
          expect(attractionService.buildAttractionMap).toHaveBeenCalled();

          expect(toTest.getAttraction(1)).toEqual(attraction1);
          expect(toTest.getAttraction(2)).toEqual(attraction2);
          expect(toTest.getAttraction(3)).toEqual(attraction3);
          expect(toTest.getAttraction(4)).toEqual(attraction4);
          expect(toTest.getAttraction(5)).toEqual(attraction5);

          done();
        }
      );

      /* Trigger the loadObservable subscription with the test data from the locationSpy. */
      nearestSubject.next(allAttractions);
    });

  });

  describe('getAttraction', () => {

    it('should be defined', () => {
      expect(toTest.getAttraction).toBeDefined();
    });

  });

  describe('getAttractionsByCategory', () => {

    it('should be defined', () => {
      expect(toTest.getAttractionsByCategory).toBeDefined();
    });

    it('should populate categories from the full list of Attractions', (done) => {
      /* train mocks */
      const nearestSubject: Subject<Attraction[]> = new Subject<Attraction[]>();
      locationSpy.nearest = jasmine.createSpy('nearest').and.returnValue(nearestSubject);
      locTypeSpy.getById = jasmine.createSpy('getById').and.callFake(
        (id) => {
          return allLocTypes[id - 11];
        }
      );

      /* make call */
      const loadObservable: Observable<boolean> = toTest.loadAllAttractions();

      /* verify results */
      loadObservable.subscribe(
        (result) => {
          expect(result).toBeTruthy();

          expect(toTest.getAttractionsByCategory(1)).toEqual(
            [
              attraction1,
              attraction2,
              attraction3
            ]
          );
          expect(toTest.getAttractionsByCategory(2)).toEqual(
            [
              attraction4
            ]
          );
          expect(toTest.getAttractionsByCategory(3)).toEqual(
            [
              attraction5
            ]
          );

          done();
        }
      );

      /* Trigger the loadObservable subscription with the test data from the locationSpy. */
      nearestSubject.next(allAttractions);
    });

  });

  describe('buildCategoryMap', () => {

    it('should be defined', () => {
      expect(toTest.buildCategoryMap).toBeDefined();
    });

    it('should treat empty LocType as Category 0 (Uncategorized)', () => {
      /* setup data */
      const attractionId = 123;
      const attractionWithoutLocType = AttractionMock.createAttractionMock(attractionId);
      const attractions = [
        attractionWithoutLocType
      ];

      /* make call */
      toTest.buildCategoryMap(attractions);

      /* verify results */
      expect(toTest.getAttractionsByCategory(0).length).toEqual(1);

    });

    it('should treat LocType with no Category as Category 0 (Uncategorized)', () => {
      /* setup data */
      const attractionId = 123;
      const attractionWithoutCategory = AttractionMock.createAttractionMock(attractionId);
      attractionWithoutCategory.locationType = {
        id: 1,
        name: 'Test Loc Type',
        description: 'No Category defined',
        category: undefined,
        icon: 'test'
      };

      const attractions = [
        attractionWithoutCategory
      ];

      /* make call */
      toTest.buildCategoryMap(attractions);

      /* verify results */
      expect(toTest.getAttractionsByCategory(0).length).toEqual(1);

    });

  });

});
