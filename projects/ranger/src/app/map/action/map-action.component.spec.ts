import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {
  async,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import {MapActionComponent} from './map-action.component';

describe('MapActionComponent', () => {
  let component: MapActionComponent;
  let fixture: ComponentFixture<MapActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapActionComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
