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
import {
  CategoryService,
  LocationService,
  LocTypeService
} from 'cr-lib';
import {of} from 'rxjs';
import {MapDataService} from '../../map/data/map-data.service';
import {ActiveAttractionService} from '../active-attraction.service';

import {DraftTabPage} from './draft-tab.page';

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

describe('DraftTabPage', () => {
  let component: DraftTabPage;
  let fixture: ComponentFixture<DraftTabPage>;

  const activeAttractionSpy = jasmine.createSpyObj('ActiveAttractionService', ['setActiveAttractionId']);
  const activatedRouteSpy = jasmine.createSpyObj('ActivatedRoute', ['get']);
  const categorySpy = jasmine.createSpyObj('CategoryService', ['get']);
  const attractionSpy = jasmine.createSpyObj('LocationService', ['get']);
  const locationTypeSpy = jasmine.createSpyObj('LocTypeService', ['get']);
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
      declarations: [ DraftTabPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        DraftTabPage,
        {provide: ActiveAttractionService, useValue: activeAttractionSpy},
        {provide: ActivatedRoute, useValue: activatedRouteSpy},
        {provide: CategoryService, useValue: categorySpy},
        {provide: LocationService, useValue: attractionSpy},
        {provide: LocTypeService, useValue: locationTypeSpy},
        {provide: MapDataService, useValue: mapDataSpy},
        {provide: Router, useValue: routerSpy},
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DraftTabPage);
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
