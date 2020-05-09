import {TestBed} from '@angular/core/testing';

import {FlagService} from './flag.service';

describe('FlagService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FlagService = TestBed.get(FlagService);
    expect(service).toBeTruthy();
  });
});
