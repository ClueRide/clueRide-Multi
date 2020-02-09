import {
  inject,
  TestBed
} from '@angular/core/testing';

import {AnswerGuard} from './answer.guard';

describe('AnswerGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AnswerGuard]
    });
  });

  it('should ...', inject([AnswerGuard], (guard: AnswerGuard) => {
    expect(guard).toBeTruthy();
  }));
});
