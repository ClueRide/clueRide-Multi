import {TestBed} from '@angular/core/testing';
import {AttractionService} from './attraction-service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {AuthHeaderService} from '../../auth/header/auth-header.service';
import {TokenService} from '../../auth/token/token.service';
import {OutingService} from '../outing/outing.service';

let toTest: AttractionService;

describe('attraction-service', () => {

  beforeEach (() => {
    TestBed.configureTestingModule(
      {
        providers: [
          AttractionService,
          AuthHeaderService,
          OutingService,
          TokenService,
        ],
        imports: [
          HttpClientTestingModule,
        ],
      }
    ).compileComponents()
      .then(
        () => {
          console.log('Compile successful');
        }
      );

    // We don't see the compilation errors if we catch them.
      // .catch(reason => {
      //   console.log("Unable to Compile")
      // });

    toTest = TestBed.get(AttractionService);
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
