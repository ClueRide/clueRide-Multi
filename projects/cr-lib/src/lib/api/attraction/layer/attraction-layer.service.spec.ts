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
let fakeLayerContainer: {[index: number]: L.Layer[]} = {};
function addLayerFake(layer: L.Layer) {
  fakeLayerContainer[layer._layerId] = layer;
}

function removeLayerFake(layer: L.Layer) {
  fakeLayerContainer[layer._layerId] = undefined;
}

function clearLayersFake() {
  fakeLayerContainer = {};
}

function getLayersFake() {
  const layerArray = [];
  for (const layerId in fakeLayerContainer) {
    if (fakeLayerContainer.hasOwnProperty(layerId)) {
      layerArray.push(fakeLayerContainer[layerId]);
    }
  }
  return layerArray;
}

/* Spies for Services. */
const categorySpy = jasmine.createSpyObj('CategoryService', ['getAllCategories']);
const categoryAttractionSpy = jasmine.createSpyObj('CategoryAttractionService', ['getAttractionMap']);
const markerSpy = jasmine.createSpyObj('PoolMarkerService', ['getAttractionMarker']);

const mapSpy = jasmine.createSpyObj('L.Map', ['addLayer', 'removeLayer', 'clearLayers', 'getLayers']);
mapSpy.addLayer = jasmine.createSpy('addLayer').and.callFake(addLayerFake);
mapSpy.removeLayer = jasmine.createSpy('removeLayer').and.callFake(removeLayerFake);
mapSpy.clearLayers = jasmine.createSpy('clearLayers').and.callFake(clearLayersFake);
mapSpy.getLayers = jasmine.createSpy('getLayers').and.callFake(getLayersFake);

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
    /* Categories listed here is a larger set than what we're exercising in this test. */
    categorySpy.getAllCategories = jasmine.createSpy('getAllCategories').and.returnValue([
      {id: 1},
      {id: 2},
      {id: 3},
      {id: 4},
      {id: 5},
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
      const loadObservable: Observable<boolean> = toTest.loadAttractionLayers(mapSpy);

      /* verify results */
      loadObservable.subscribe(
        (result) => {
          expect(result).toBeTruthy();
          expect(mapSpy.clearLayers).toHaveBeenCalled();
          expect(mapSpy.getLayers().length).toEqual(3);
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
      const loadObservable: Observable<boolean> = toTest.loadAttractionLayers(mapSpy);

      /* Await initialization. */
      loadObservable.subscribe(
        (result) => {
          expect(result).toBeTruthy();

          /* make call */
          toTest.showFilteredAttractions(filterAllOff);

          /* verify results */
          expect(mapSpy.getLayers().length).toEqual(0);
          done();
        });

    });

    it('should set single category if filter requests one category', (done) => {
      /* setup data */
      const filterSelectCategory2 = new Filter();
      filterSelectCategory2.categoriesToIncludeById.push(2);

      /* train mocks */
      mapSpy.addLayer = jasmine.createSpy('addLayer').and.callThrough();

      /* Trigger initialization. */
      const loadObservable: Observable<boolean> = toTest.loadAttractionLayers(mapSpy);

      /* Await initialization. */
      loadObservable.subscribe(
        (result) => {
          expect(result).toBeTruthy();

          /* make call */
          toTest.showFilteredAttractions(filterSelectCategory2);

          /* verify results */
          expect(mapSpy.getLayers().length).toEqual(1);
          expect(mapSpy.addLayer).toHaveBeenCalled();
          done();
        });

    });

    it('should not try to add a layer without markers', (done) => {
      /* setup data */
      const filterSelectCategory4 = new Filter();
      filterSelectCategory4.categoriesToIncludeById.push(4);

      /* train mocks */
      mapSpy.addLayer = jasmine.createSpy('addLayer').and.callThrough();

      /* Trigger initialization. */
      const loadObservable: Observable<boolean> = toTest.loadAttractionLayers(mapSpy);

      /* Await initialization. */
      loadObservable.subscribe(
        (result) => {
          expect(result).toBeTruthy();

          /* make call */
          toTest.showFilteredAttractions(filterSelectCategory4);

          /* verify results */
          expect(mapSpy.getLayers().length).toEqual(0);
          expect(mapSpy.addLayer).not.toHaveBeenCalled();
          done();
        });

    });
  });

});

