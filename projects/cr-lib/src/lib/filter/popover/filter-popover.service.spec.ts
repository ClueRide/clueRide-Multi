import {TestBed} from '@angular/core/testing';

import {FilterPopoverService} from './filter-popover.service';

describe('FilterPopoverService', () => {
  const popoverControllerSpy = jasmine.createSpyObj('PopoverController', ['get']);
  let toTest: FilterPopoverService;

  beforeEach(() => {
      TestBed.configureTestingModule({});

      toTest = new FilterPopoverService(popoverControllerSpy);
    }
  );

  it('should be created', () => {
    expect(toTest).toBeTruthy();
  });

});
