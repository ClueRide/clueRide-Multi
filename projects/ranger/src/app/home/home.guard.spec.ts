import {
  inject,
  TestBed
} from '@angular/core/testing';
import {AwaitRegistrationService} from 'cr-lib';

import {HomeGuard} from './home.guard';

const awaitRegistrationSpy = jasmine.createSpyObj('AwaitRegistrationService', ['getRegistrationActiveObservable']);

describe('HomeGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HomeGuard,
        {provide: AwaitRegistrationService, useValue: awaitRegistrationSpy},
      ]
    });
  });

  it('should be created', inject([HomeGuard], (guard: HomeGuard) => {
    expect(guard).toBeTruthy();
  }));

});
