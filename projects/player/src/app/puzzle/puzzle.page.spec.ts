import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {
  async,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';
import {PuzzleService} from 'cr-lib';

import {PuzzlePage} from './puzzle.page';

describe('PuzzlePage', () => {
  let component: PuzzlePage;
  let fixture: ComponentFixture<PuzzlePage>;

  const puzzleSpy = jasmine.createSpyObj('PuzzleService', ['getPuzzle']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PuzzlePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        PuzzlePage,
        {provide: PuzzleService, useValue: puzzleSpy},
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
