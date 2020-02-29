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
import {AlertController} from '@ionic/angular';
import {
  AttractionMock,
  CategoryAttractionService,
  ImageService,
  LocationService
} from 'cr-lib';
import {of} from 'rxjs';
import {MapDataService} from '../../map/data/map-data.service';
import {ActiveAttractionService} from '../active-attraction.service';

import {PlaceTabPage} from './place-tab.page';

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

describe('PlaceTabPage', () => {
  let component: PlaceTabPage;
  let fixture: ComponentFixture<PlaceTabPage>;

  const activeAttractionSpy = jasmine.createSpyObj('ActiveAttractionService', ['setActiveAttractionId']);
  const activatedRouteSpy = jasmine.createSpyObj('ActivatedRoute', ['get']);
  const alertSpy = jasmine.createSpyObj('AlertController', ['get']);
  const attractionSpy = jasmine.createSpyObj('LocationService', ['get']);
  const categoryAttractionSpy = jasmine.createSpyObj('CategoryAttractionService', ['getAttraction']);
  const imageSpy = jasmine.createSpyObj('ImageService', ['get']);
  const mapDataSpy = jasmine.createSpyObj('MapDataService', ['getAttractionById']);
  const routerSpy = jasmine.createSpyObj('Router', ['get']);

  beforeEach(async(() => {
    activatedRouteSpy.queryParams = of(true);
    activatedRouteSpy.snapshot = new MockParamMap();
    activatedRouteSpy.snapshot.paramMap.get = jasmine.createSpy('get').and.returnValue('42');

    categoryAttractionSpy.getAttraction = jasmine.createSpy('getAttraction').and.returnValue(
      AttractionMock.createAttractionMock(123)
    );

    TestBed.configureTestingModule({
      declarations: [ PlaceTabPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        PlaceTabPage,
        {provide: ActiveAttractionService, useValue: activeAttractionSpy},
        {provide: ActivatedRoute, useValue: activatedRouteSpy},
        {provide: AlertController, useValue: alertSpy},
        {provide: CategoryAttractionService, useValue: categoryAttractionSpy},
        {provide: ImageService, useValue: imageSpy},
        {provide: LocationService, useValue: attractionSpy},
        {provide: MapDataService, useValue: mapDataSpy},
        {provide: Router, useValue: routerSpy},
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaceTabPage);
    component = fixture.componentInstance;
    component.attraction = {
      id: 123,
      name: 'Test Name',
      nodeId: 234,
      readinessLevel: 'DRAFT',
      latLon: null,
      locationTypeId: 4,
      featuredImage: undefined
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getAttraction to retrieve the instance to be edited', () => {
    expect(categoryAttractionSpy.getAttraction).toHaveBeenCalled();
  });

});
