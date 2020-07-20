import {TestBed} from '@angular/core/testing';

import {AttractionByPathService} from './attraction-by-path.service';

describe('AttractionByPathService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AttractionByPathService = TestBed.get(AttractionByPathService);
    expect(service).toBeTruthy();
  });
});
