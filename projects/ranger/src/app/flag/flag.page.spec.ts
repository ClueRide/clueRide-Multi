import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {
  async,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import {FlagPage} from './flag.page';

describe('FlagPage', () => {
  let component: FlagPage;
  let fixture: ComponentFixture<FlagPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlagPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlagPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
