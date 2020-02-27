import {TestBed} from '@angular/core/testing';
import {AttractionService} from '../attraction.service';

import {CategoryAttractionService} from './category-attraction.service';

const attractionSpy = jasmine.createSpyObj('AttractionService', ['get']);

describe('CategoryAttractionService', () => {
  let toTest: CategoryAttractionService;

  beforeEach(() => {
    TestBed.configureTestingModule( {});
    toTest = new CategoryAttractionService(
      attractionSpy
    );
  });

  it('should be created', () => {
    expect(toTest).toBeTruthy();
  });

  describe('loadAllAttractions', () => {

    it('should be defined', () => {
      expect(toTest.loadAllAttractions).toBeDefined();
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

  });

});
