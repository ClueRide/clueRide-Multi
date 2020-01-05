import {TestBed} from '@angular/core/testing';

import {LoadStateServiceService} from './load-state-service.service';

describe('LoadStateServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoadStateServiceService = TestBed.get(LoadStateServiceService);
    expect(service).toBeTruthy();
  });
});
