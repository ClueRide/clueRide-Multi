import {AuthHeaderService} from '../../auth/header/auth-header.service';
import {OutingService} from '../outing/outing.service';
import {AttractionService} from './attraction.service';

const authHeaderSpy = jasmine.createSpyObj('AuthHeaderService', ['get']);
const httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
const outingSpy = jasmine.createSpyObj('OutingService', ['get']);
const locationSpy = jasmine.createSpyObj('LocationService', ['get']);
const locTypeSpy = jasmine.createSpyObj('LocTypeService', ['get']);

describe('attraction-service', () => {
  let toTest: AttractionService;

  beforeEach (() => {
    toTest = new AttractionService(
      httpClientSpy,
      authHeaderSpy,
      outingSpy,
      locationSpy,
      locTypeSpy
    );
  });

  it('should exist', () => {
    expect(toTest).toBeTruthy();
  });

  describe('buildAttractionMap', () => {

    it('should be defined', () => {
      expect(toTest.buildAttractionMap).toBeDefined();
    });

  });

});
