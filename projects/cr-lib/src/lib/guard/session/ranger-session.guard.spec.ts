import {
  inject,
  TestBed
} from '@angular/core/testing';

import {RangerSessionGuard} from './ranger-session.guard';

describe('SeekerSessionGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RangerSessionGuard]
    });
  });

  it('should ...', inject([RangerSessionGuard], (guard: RangerSessionGuard) => {
    expect(guard).toBeTruthy();
  }));
});
