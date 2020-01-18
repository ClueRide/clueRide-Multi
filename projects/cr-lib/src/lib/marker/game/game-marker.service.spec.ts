import {TestBed} from '@angular/core/testing';

import {GameMarkerService} from './game-marker.service';

describe('GameMarkerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GameMarkerService = TestBed.get(GameMarkerService);
    expect(service).toBeTruthy();
  });
});
