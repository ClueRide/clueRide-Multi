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
const map = L.layerGroup();

/* Spies for Services. */
const categorySpy = jasmine.createSpyObj('CategoryService', ['getAllCategories']);
const categoryAttractionSpy = jasmine.createSpyObj('CategoryAttractionService', ['getAttractionMap']);
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
    categoryAttractionSpy.getAttractionMap = jasmine.createSpy('getAttractionMap')
      .and.returnValue(attractionsByCategory);
    markerSpy.getAttractionMarker = jasmine.createSpy('getAttractionMarker').and.returnValue({});
    categorySpy.getAllCategories = jasmine.createSpy('getAllCategories').and.returnValue([
      {id: 1},
      {id: 2},
      {id: 3}
    ]);

  });

  it('should be created', () => {
    expect(toTest).toBeTruthy();
  });

  describe('loadAttractionLayers', () => {

    it('should be defined', () => {
      expect(toTest.loadAttractionLayers).toBeDefined();
    });

    it('should add a layer per Category to the map', (done) => {
      /* Setup data */

      /* make call */
      const loadObservable: Observable<boolean> = toTest.loadAttractionLayers(map);

      /* verify results */
      loadObservable.subscribe(
        (result) => {
          expect(result).toBeTruthy();
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
      const loadObservable: Observable<boolean> = toTest.loadAttractionLayers(map);

      /* Await initialization. */
      loadObservable.subscribe(
        (result) => {
          expect(result).toBeTruthy();

          /* make call */
          toTest.showFilteredAttractions(filterAllOff);

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
      const loadObservable: Observable<boolean> = toTest.loadAttractionLayers(map);

      /* Await initialization. */
      loadObservable.subscribe(
        (result) => {
          expect(result).toBeTruthy();

          /* make call */
          toTest.showFilteredAttractions(filterSelectCategory2);

          /* verify results */
          expect(map.getLayers().length).toEqual(1);
          done();
        });

    });

  });

});

