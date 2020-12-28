import {
  inject,
  TestBed
} from '@angular/core/testing';

import {LoadStateGuard} from './load-state.guard';

describe('LoadStateGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoadStateGuard]
    });
  });

  it('should ...', inject([LoadStateGuard], (guard: LoadStateGuard) => {
    expect(guard).toBeTruthy();
  }));
});
