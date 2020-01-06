import {TestBed} from '@angular/core/testing';

import {GuideEventServiceService} from './guide-event-service.service';

describe('GuideEventServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GuideEventServiceService = TestBed.get(GuideEventServiceService);
    expect(service).toBeTruthy();
  });
});
