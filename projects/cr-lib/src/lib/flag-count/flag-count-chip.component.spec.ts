import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {
  async,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import {FlagCountChipComponent} from './flag-count-chip.component';

describe('FlagCountChipComponent', () => {
  let component: FlagCountChipComponent;
  let fixture: ComponentFixture<FlagCountChipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlagCountChipComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlagCountChipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
