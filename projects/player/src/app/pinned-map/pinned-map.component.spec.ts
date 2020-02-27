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
import {of} from 'rxjs';

import {PinnedMapComponent} from './pinned-map.component';

describe('PinnedMapComponent', () => {
  let component: PinnedMapComponent;
  let fixture: ComponentFixture<PinnedMapComponent>;

  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PinnedMapComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        PinnedMapComponent,
        GameMarkerService,
        LatLonService,
        {provide: Router, useValue: routerSpy},
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PinnedMapComponent);
    component = fixture.componentInstance;
    component.startingLocationObservable = of({
      id: 123,
      name: 'Test Name',
      nodeId: 234,
      readinessLevel: 'DRAFT',
      latLon: {
        id: 1,
        lat: 0.0,
        lon: 0.0
      },
      locationTypeId: 4,
      featuredImage: null
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
