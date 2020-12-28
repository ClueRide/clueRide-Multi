import {
  inject,
  TestBed
} from '@angular/core/testing';

import {SeekerSessionGuard} from './seeker-session.guard';

describe('SeekerSessionGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SeekerSessionGuard]
    });
  });

  it('should ...', inject([SeekerSessionGuard], (guard: SeekerSessionGuard) => {
    expect(guard).toBeTruthy();
  }));
});
