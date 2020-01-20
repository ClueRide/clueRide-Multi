import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {
  async,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import {LocationService} from 'cr-lib';
import {of} from 'rxjs';
import {MapDataService} from '../../map/data/map-data.service';
import {ActiveAttractionService} from '../active-attraction.service';

import {PuzzleTabPage} from './puzzle-tab.page';

class MockParamMap {
  paramMap: {
    get: {}
  };
  constructor() {
    this.paramMap = {
      get: jasmine.createSpy()
    };
  }
}

describe('PuzzleTabPage', () => {
  let component: PuzzleTabPage;
  let fixture: ComponentFixture<PuzzleTabPage>;

  const activeAttractionSpy = jasmine.createSpyObj('ActiveAttractionService', ['setActiveAttractionId']);
  const activatedRouteSpy = jasmine.createSpyObj('ActivatedRoute', ['get']);
  const attractionSpy = jasmine.createSpyObj('LocationService', ['get']);
  const mapDataSpy = jasmine.createSpyObj('MapDataService', ['getAttractionById']);
  const routerSpy = jasmine.createSpyObj('Router', ['get']);

  beforeEach(async(() => {
    activatedRouteSpy.queryParams = of(true);
    activatedRouteSpy.snapshot = new MockParamMap();
    activatedRouteSpy.snapshot.paramMap.get = jasmine.createSpy('get').and.returnValue('42');

    mapDataSpy.getAttractionById = jasmine.createSpy('getAttractionById').and.returnValue({
      id: 123,
      name: 'Test Name',
      nodeId: 234,
      readinessLevel: 'DRAFT',
      latLon: null,
      locationTypeId: 4,
      featuredImage: null
    });

    TestBed.configureTestingModule({
      declarations: [ PuzzleTabPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        PuzzleTabPage,
        {provide: ActiveAttractionService, useValue: activeAttractionSpy},
        {provide: ActivatedRoute, useValue: activatedRouteSpy},
        {provide: LocationService, useValue: attractionSpy},
        {provide: MapDataService, useValue: mapDataSpy},
        {provide: Router, useValue: routerSpy},
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PuzzleTabPage);
    component = fixture.componentInstance;
    component.attraction = {
      id: 123,
      name: 'Test Name',
      nodeId: 234,
      readinessLevel: 'DRAFT',
      latLon: null,
      locationTypeId: 4,
      featuredImage: null
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
