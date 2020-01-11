import {HttpClient} from '@angular/common/http';
import {
  inject,
  TestBed
} from '@angular/core/testing';
import {LoadStateService} from '../state/load/load-state.service';

import {RollingGuard} from './rolling.guard';

describe('RollingGuard', () => {
  beforeEach(() => {
    const httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    const loadStateSpy = jasmine.createSpyObj('LoadStateService', ['getLoadStateObservable']);

    TestBed.configureTestingModule({
      providers: [
        RollingGuard,
        {provide: HttpClient, useValue: httpClientSpy},
        {provide: LoadStateService, useValue: loadStateSpy},
      ]
    });
  });

  it('should create', inject([RollingGuard], (guard: RollingGuard) => {
    expect(guard).toBeTruthy();
  }));
});
