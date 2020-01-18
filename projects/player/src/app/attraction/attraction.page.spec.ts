import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {
  async,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import {AttractionPage} from './attraction.page';

describe('AttractionPage', () => {
  let component: AttractionPage;
  let fixture: ComponentFixture<AttractionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttractionPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttractionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
