import {TestBed} from '@angular/core/testing';

import {GuideEventService} from './guide-event.service';

describe('GuideEventServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GuideEventService = TestBed.get(GuideEventService);
    expect(service).toBeTruthy();
  });
});
