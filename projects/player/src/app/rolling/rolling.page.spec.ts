import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {
  async,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import {RollingPage} from './rolling.page';

describe('RollingPage', () => {
  let component: RollingPage;
  let fixture: ComponentFixture<RollingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RollingPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RollingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
