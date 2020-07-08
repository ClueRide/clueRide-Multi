import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {
  async,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import {AttractionsPage} from './attractions.page';

describe('AttractionsPage', () => {
  let component: AttractionsPage;
  let fixture: ComponentFixture<AttractionsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttractionsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttractionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
