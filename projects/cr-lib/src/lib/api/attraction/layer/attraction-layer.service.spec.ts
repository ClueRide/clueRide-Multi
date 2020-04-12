import {TestBed} from '@angular/core/testing';

import * as L from 'leaflet';
import {Observable} from 'rxjs';
import {Filter} from '../../../filter/filter';
import {PoolMarkerService} from '../../../marker/pool/pool-marker.service';
import {AttractionsByCategory} from '../category/attractions-by-category';
import {AttractionsByCategoryMock} from '../category/attractions-by-category-mock';

import {AttractionLayerService} from './attraction-layer.service';

/* AttractionsByCategory map for testing. */
const attractionsByCategory: AttractionsByCategory = AttractionsByCategoryMock.createAttractionsByCategoryMock();

/* Where we will be adding all our layers. */
let map;

/* All Categories expected to be returned by CategoryService normally. */
const allCategories = [
    {id: 1, name: 'Cat-1'},
    {id: 2, name: 'Cat-2'},
    {id: 3, name: 'Cat-3'},
  ];

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
    map = L.layerGroup();
    categorySpy.getAllCategories = jasmine.createSpy('getAllCategories').and.returnValue(allCategories);
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

    it('should throw error if the category is not ready', (done) => {
      /* Setup data */

      /* Train mocks */
      categorySpy.getAllCategories = jasmine.createSpy('getAllCategories').and.returnValue([]);

      /* make call */
      const loadObservable: Observable<boolean> = toTest.loadAttractionLayers();

      /* verify results */
      loadObservable.subscribe(
        (result) => {
          expect(result).toBeFalsy();
          expect(map.getLayers().length).toEqual(0);
          done();
        });

    });

  });

  describe('showFilteredAttractions', () => {

    it('should be defined', () => {
      expect(toTest.showFilteredAttractions).toBeDefined();
    });

    it('should completely fill map if filter is empty', (done) => {
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
            map
          );

          /* verify results */
          expect(map.getLayers().length).toEqual(3);
          done();
        });

    });

    it('should set single category if filter requests one category', (done) => {
      /* setup data */
      const filterSelectCategory2 = new Filter();
      filterSelectCategory2.categoriesToIncludeById.push(2);
      filterSelectCategory2.isEmpty = false;

      /* Trigger initialization. */
      const loadObservable: Observable<boolean> = toTest.loadAttractionLayers();

      /* Await initialization. */
      loadObservable.subscribe(
        (result) => {
          expect(result).toBeTruthy();

          /* make call */
          toTest.showFilteredAttractions(
            filterSelectCategory2,
            map
          );

          /* verify results */
          expect(map.getLayers().length).toEqual(1);
          done();
        });

    });

  });

});

