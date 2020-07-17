import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {
  async,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import {AttractionsSequencePage} from './attractions-sequence-page.component';

describe('AttractionsPage', () => {
  let component: AttractionsSequencePage;
  let fixture: ComponentFixture<AttractionsSequencePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttractionsSequencePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttractionsSequencePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
