import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {
  async,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import {MapCenterDisplayComponent} from './map-center-display.component';

describe('MapCenterDisplayComponent', () => {
  let component: MapCenterDisplayComponent;
  let fixture: ComponentFixture<MapCenterDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapCenterDisplayComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapCenterDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
