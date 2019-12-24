import {TestBed} from '@angular/core/testing';

import {ActiveAttractionService} from './active-attraction.service';

describe('ActiveAttractionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ActiveAttractionService = TestBed.get(ActiveAttractionService);
    expect(service).toBeTruthy();
  });
});
