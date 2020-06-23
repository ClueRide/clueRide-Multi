import {TestBed} from '@angular/core/testing';

import {BoundsService} from './bounds-service';

describe('BoundsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BoundsService = TestBed.get(BoundsService);
    expect(service).toBeTruthy();
  });
});
