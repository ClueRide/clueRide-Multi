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

/* Data instances. */
const allAttractions = AttractionMock.createAttractionMockSet();
const allLocTypes = LocTypeMock.createLocTypeSet();

/* Mocked Services. */
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

          expect(toTest.getAttraction(1)).toEqual(allAttractions[0]);
          expect(toTest.getAttraction(2)).toEqual(allAttractions[1]);
          expect(toTest.getAttraction(3)).toEqual(allAttractions[2]);
          expect(toTest.getAttraction(4)).toEqual(allAttractions[3]);
          expect(toTest.getAttraction(5)).toEqual(allAttractions[4]);

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
          return allLocTypes[id - 1];
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
              allAttractions[0],
              allAttractions[1],
              allAttractions[2]
            ]
          );
          expect(toTest.getAttractionsByCategory(2)).toEqual(
            [
              allAttractions[3]
            ]
          );
          expect(toTest.getAttractionsByCategory(3)).toEqual(
            [
              allAttractions[4]
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
