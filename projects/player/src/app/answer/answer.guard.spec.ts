import {
  inject,
  TestBed
} from '@angular/core/testing';
import {LoadStateService} from '../state/load/load-state.service';

import {AnswerGuard} from './answer.guard';

describe('AnswerGuard', () => {
  const loadStateSpy = jasmine.createSpyObj('LoadStateService', ['get']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AnswerGuard,
        {provide: LoadStateService, useValue: loadStateSpy},
      ]
    });
  });

  it('should ...', inject([AnswerGuard], (guard: AnswerGuard) => {
    expect(guard).toBeTruthy();
  }));

});
