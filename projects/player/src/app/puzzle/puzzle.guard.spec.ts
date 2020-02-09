import {
  inject,
  TestBed
} from '@angular/core/testing';

import {PuzzleGuard} from './puzzle.guard';

describe('PuzzleGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PuzzleGuard]
    });
  });

  it('should ...', inject([PuzzleGuard], (guard: PuzzleGuard) => {
    expect(guard).toBeTruthy();
  }));
});
