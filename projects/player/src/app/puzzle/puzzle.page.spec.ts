import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {
  async,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import {
  AnswerSummaryService,
  PuzzleService
} from 'cr-lib';
import {of} from 'rxjs';

import {PuzzlePage} from './puzzle.page';

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

describe('PuzzlePage', () => {
  let component: PuzzlePage;
  let fixture: ComponentFixture<PuzzlePage>;

  const puzzleSpy = jasmine.createSpyObj('PuzzleService', ['getPuzzle']);
  const activatedRouteSpy = jasmine.createSpyObj('ActivatedRoute', ['snapshot']);
  const answerSummaryService = jasmine.createSpyObj('AnswerSummaryService', ['getPuzzle']);
  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

  beforeEach(async(() => {
    activatedRouteSpy.queryParams = of(true);
    activatedRouteSpy.snapshot = new MockParamMap();
    activatedRouteSpy.snapshot.paramMap.get = jasmine.createSpy('get').and.returnValue('160');
    TestBed.configureTestingModule({
      declarations: [ PuzzlePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        PuzzlePage,
        {provide: PuzzleService, useValue: puzzleSpy},
        {provide: ActivatedRoute, useValue: activatedRouteSpy},
        {provide: AnswerSummaryService, useValue: answerSummaryService},
        {provide: Router, useValue: routerSpy},
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PuzzlePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
