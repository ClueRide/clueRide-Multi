import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {
  async,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import {DraftTabPage} from './draft-tab.page';

describe('DraftTabPage', () => {
  let component: DraftTabPage;
  let fixture: ComponentFixture<DraftTabPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DraftTabPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DraftTabPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
