import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {
  async,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import {PlaceTabPage} from './place-tab.page';

describe('PlaceTabPage', () => {
  let component: PlaceTabPage;
  let fixture: ComponentFixture<PlaceTabPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaceTabPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaceTabPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
