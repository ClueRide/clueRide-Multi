import {TestBed} from '@angular/core/testing';

import {CategoryAttractionService} from './category-attraction.service';

describe('CategoryAttractionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CategoryAttractionService = TestBed.get(CategoryAttractionService);
    expect(service).toBeTruthy();
  });
});
