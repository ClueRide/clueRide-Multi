import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {
  async,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';
import {MapDataService} from '../data/map-data.service';
import {MapDragService} from '../drag/map-drag.service';
import {MapStateService} from '../state/map-state.service';

import {MapActionComponent} from './map-action.component';
import {FilterPopoverService} from 'cr-lib';

const mapDataSpy = jasmine.createSpyObj('MapDataService', ['get']);
const mapStateSpy = jasmine.createSpyObj('MapStateService', ['get']);
const mapDragSpy = jasmine.createSpyObj('MapDragService', ['get']);
const filterPopoverSpy = jasmine.createSpyObj('FilterPopoverService', ['showFilter']);

describe('MapActionComponent', () => {
  let component: MapActionComponent;
  let fixture: ComponentFixture<MapActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapActionComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        MapActionComponent,
        {provide: MapDataService, useValue: mapDataSpy},
        {provide: MapStateService, useValue: mapStateSpy},
        {provide: MapDragService, useValue: mapDragSpy},
        {provide: FilterPopoverService, useValue: filterPopoverSpy},
      ]
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
