import {
  inject,
  TestBed
} from '@angular/core/testing';
import {LoadStateService} from 'cr-lib';

import {PuzzleGuard} from './puzzle.guard';

describe('PuzzleGuard', () => {
  const loadStateSpy = jasmine.createSpyObj('LoadStateService', ['get']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PuzzleGuard,
        {provide: LoadStateService, useValue: loadStateSpy},
      ]
    });
  });

  it('should ...', inject([PuzzleGuard], (guard: PuzzleGuard) => {
    expect(guard).toBeTruthy();
  }));

});
