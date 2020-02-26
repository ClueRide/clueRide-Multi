import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {
  async,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';
import {Router} from '@angular/router';
import {
  GameMarkerService,
  LatLonService
} from 'cr-lib';

import {PinnedMapComponent} from './pinned-map.component';

describe('PinnedMapComponent', () => {
  let component: PinnedMapComponent;
  let fixture: ComponentFixture<PinnedMapComponent>;

  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
  const latLonSpy = jasmine.createSpyObj('LatLonService', ['get']);
  const markerSpy = jasmine.createSpyObj('GameMarkerService', ['get']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PinnedMapComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        PinnedMapComponent,
        {provide: Router, useValue: routerSpy},
        {provide: LatLonService, useValue: latLonSpy},
        {provide: GameMarkerService, useValue: markerSpy},
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PinnedMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
