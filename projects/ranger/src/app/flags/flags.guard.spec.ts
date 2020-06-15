import {
  inject,
  TestBed
} from '@angular/core/testing';

import {FlagsGuard} from './flags.guard';

describe('FlagsGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FlagsGuard]
    });
  });

  it('should ...', inject([FlagsGuard], (guard: FlagsGuard) => {
    expect(guard).toBeTruthy();
  }));
});
