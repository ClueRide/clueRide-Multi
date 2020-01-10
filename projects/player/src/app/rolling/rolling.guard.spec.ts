import {
  inject,
  TestBed
} from '@angular/core/testing';

import {RollingGuard} from './rolling.guard';

describe('RollingGuardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RollingGuard]
    });
  });

  it('should ...', inject([RollingGuard], (guard: RollingGuard) => {
    expect(guard).toBeTruthy();
  }));
});
