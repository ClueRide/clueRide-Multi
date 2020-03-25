import {TestBed} from '@angular/core/testing';

import * as L from 'leaflet';
import {
  Observable,
  of
} from 'rxjs';
import {Filter} from '../../../filter/filter';
import {PoolMarkerService} from '../../../marker/pool/pool-marker.service';
import {AttractionsByCategory} from '../category/attractions-by-category';
import {AttractionsByCategoryMock} from '../category/attractions-by-category-mock';

import {AttractionLayerService} from './attraction-layer.service';

/* AttractionsByCategory map for testing. */
const attractionsByCategory: AttractionsByCategory = AttractionsByCategoryMock.createAttractionsByCategoryMock();
/* Where we will be adding all our layers. */
const map = L.layerGroup();

/* Spies for Services. */
const categorySpy = jasmine.createSpyObj('CategoryService', ['getAllCategories']);
const categoryAttractionSpy = jasmine.createSpyObj('CategoryAttractionService', [
  'getAttractionMap',
  'loadAllAttractions'
]);
const markerSpy = jasmine.createSpyObj('PoolMarkerService', ['getAttractionMarker']);

describe('AttractionLayerService', () => {
  let toTest: AttractionLayerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});

    toTest = new AttractionLayerService(
      categorySpy,
      categoryAttractionSpy,
      markerSpy
    );

    /* Common spy setup. */
    categorySpy.loadSync = jasmine.createSpy('loadSync');
    categorySpy.getAllCategories = jasmine.createSpy('getAllCategories').and.returnValues(
      [],
      [
        {id: 1},
        {id: 2},
        {id: 3},
      ]
    );
    categoryAttractionSpy.loadAllAttractions = jasmine.createSpy('loadAllAttractions').and.returnValue(of(true));
    categoryAttractionSpy.getAttractionMap = jasmine.createSpy('getAttractionMap').and.returnValue(attractionsByCategory);
    markerSpy.getAttractionMarker = jasmine.createSpy('getAttractionMarker').and.returnValue({});
  });

  it('should be created', () => {
    expect(toTest).toBeTruthy();
  });

  describe('loadAttractionLayers', () => {

    it('should be defined', () => {
      expect(toTest.loadAttractionLayers).toBeDefined();
    });

    it('should wait for Categories to be populated', (done) => {
      /* Setup data */

      /* Train mocks */

      /* make call */
      const loadObservable: Observable<boolean> = toTest.loadAttractionLayers();

      /* verify results */
      loadObservable.subscribe(
        (result) => {
          expect(result).toBeTruthy();
          expect(categorySpy.loadSync).toHaveBeenCalled();
          expect(map.getLayers().length).toEqual(3);
          done();
        });

    });

  });

  describe('showFilteredAttractions', () => {

    it('should be defined', () => {
      expect(toTest.showFilteredAttractions).toBeDefined();
    });

    it('should clear map if filter is all off', (done) => {
      /* setup data */
      const filterAllOff = new Filter();

      /* Trigger initialization. */
      const loadObservable: Observable<boolean> = toTest.loadAttractionLayers();

      /* Await initialization. */
      loadObservable.subscribe(
        (result) => {
          expect(result).toBeTruthy();

          /* make call */
          toTest.showFilteredAttractions(
            filterAllOff,
            L.layerGroup([])
          );

          /* verify results */
          expect(map.getLayers().length).toEqual(0);
          done();
        });

    });

    it('should set single category if filter requests one category', (done) => {
      /* setup data */
      const filterSelectCategory2 = new Filter();
      filterSelectCategory2.categoriesToIncludeById.push(2);

      /* Trigger initialization. */
      const loadObservable: Observable<boolean> = toTest.loadAttractionLayers();

      /* Await initialization. */
      loadObservable.subscribe(
        (result) => {
          expect(result).toBeTruthy();

          /* make call */
          toTest.showFilteredAttractions(
            filterSelectCategory2,
            L.layerGroup([])
          );

          /* verify results */
          expect(map.getLayers().length).toEqual(1);
          done();
        });

    });

  });

});

