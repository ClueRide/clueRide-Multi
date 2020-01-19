import {HttpClient} from '@angular/common/http';
import {AuthHeaderService} from '../../auth/header/auth-header.service';
import {OutingService} from '../outing/outing.service';
import {AttractionService} from './attraction.service';

const authHeaderSpy = jasmine.createSpyObj('AuthHeaderService', ['get']);
const outingSpy = jasmine.createSpyObj('OutingService', ['get']);
const httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);

describe('attraction-service', () => {
  let toTest: AttractionService;

  beforeEach (() => {
    toTest = new AttractionService(
      httpClientSpy,
      authHeaderSpy,
      outingSpy
    );
  });

  it('should exist', () => {
    expect(toTest).toBeTruthy();
  });

  describe('getVisibleAttractions', () => {

  });

  describe('classifyVisibleAttractions', () => {

    it('should exist', () => {
      expect(toTest.classifyVisibleAttractions).toBeTruthy();
    });

  });

});
