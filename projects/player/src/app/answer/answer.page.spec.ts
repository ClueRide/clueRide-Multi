import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {
  async,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';
import {ActivatedRoute} from '@angular/router';
import {
  AnswerSummary,
  AnswerSummaryService,
  Puzzle,
  PuzzleService
} from 'cr-lib';
import {of} from 'rxjs';

import {AnswerPage} from './answer.page';

class MockParamMap {
  paramMap: {
    get: {}
  };
  constructor() {
    this.paramMap = {
      get: jasmine.createSpy()
    };
  }
}


describe('AnswerPage', () => {
  let component: AnswerPage;
  let fixture: ComponentFixture<AnswerPage>;
  const mockAnswerSummary = new AnswerSummary();

  const activatedRouteSpy = jasmine.createSpyObj('ActivatedRoute', ['snapshot']);
  const answerSummarySpy = jasmine.createSpyObj('AnswerSummaryService', ['getPuzzle', 'openAnswerSummaryChannel']);
  const puzzleSpy = jasmine.createSpyObj('PuzzleService', ['getPuzzle']);

  beforeEach(async(() => {
    activatedRouteSpy.queryParams = of(true);
    activatedRouteSpy.snapshot = new MockParamMap();
    activatedRouteSpy.snapshot.paramMap.get = jasmine.createSpy('get').and.returnValue('160');
    answerSummarySpy.openAnswerSummaryChannel = jasmine.createSpy(
      'openAnswerSummaryChannel'
    ).and.returnValue(
      of(mockAnswerSummary)
    );
    puzzleSpy.getPuzzle = jasmine.createSpy('getPuzzle').and.returnValue(new Puzzle());

    TestBed.configureTestingModule({
      declarations: [ AnswerPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {provide: ActivatedRoute, useValue: activatedRouteSpy},
        {provide: AnswerSummaryService, useValue: answerSummarySpy},
        {provide: PuzzleService, useValue: puzzleSpy},
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnswerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
