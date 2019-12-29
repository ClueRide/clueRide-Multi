import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {
  async,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import {PuzzleModalPage} from './puzzle-modal.page';

describe('PuzzleModalPage', () => {
  let component: PuzzleModalPage;
  let fixture: ComponentFixture<PuzzleModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PuzzleModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PuzzleModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
