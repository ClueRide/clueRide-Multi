import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {
  async,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import {FlagsPage} from './flags.page';

describe('FlagsPage', () => {
  let component: FlagsPage;
  let fixture: ComponentFixture<FlagsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlagsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlagsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
