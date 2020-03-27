import {TestBed} from '@angular/core/testing';

import {FilterPopoverService} from './filter-popover.service';

describe('FilterPopoverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FilterPopoverService = TestBed.get(FilterPopoverService);
    expect(service).toBeTruthy();
  });
});
