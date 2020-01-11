import {HttpClient} from '@angular/common/http';
import {TestBed} from '@angular/core/testing';
import {
  AuthHeaderService,
  OutingService,
  ProfileService
} from 'cr-lib';

import {GuideEventService} from './guide-event.service';

describe('GuideEventService', () => {
  beforeEach(
    () => {
      const httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
      const authHeaderSpy = jasmine.createSpyObj('AuthHeaderService', ['get']);
      const outingSpy = jasmine.createSpyObj('OutingService', ['get']);
      const profileSpy = jasmine.createSpyObj('ProfileService', ['get']);

      TestBed.configureTestingModule({
        providers: [
          GuideEventService,
          {provide: HttpClient, useValue: httpClientSpy},
          {provide: AuthHeaderService, useValue: authHeaderSpy},
          {provide: OutingService, useValue: outingSpy},
          {provide: ProfileService, useValue: profileSpy},
        ]
      });
    });

  it('should be created', () => {
    const service: GuideEventService = TestBed.get(GuideEventService);
    expect(service).toBeTruthy();
  });

});
