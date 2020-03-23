import {TestBed} from '@angular/core/testing';

import {MapPositionService} from './map-position.service';

describe('MapPositionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MapPositionService = TestBed.get(MapPositionService);
    expect(service).toBeTruthy();
  });
});
