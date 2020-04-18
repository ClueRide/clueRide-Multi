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
  AttractionMock,
  CategoryAttractionService,
  LocationService
} from 'cr-lib';
import {of} from 'rxjs';
import {MapDataService} from '../../map/data/map-data.service';
import {ActiveAttractionService} from '../active-attraction.service';

import {PuzzleTabPageComponent} from './puzzle-tab.page';

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
  let component: PuzzleTabPageComponent;
  let fixture: ComponentFixture<PuzzleTabPageComponent>;

  const activeAttractionSpy = jasmine.createSpyObj('ActiveAttractionService', ['setActiveAttractionId']);
  const activatedRouteSpy = jasmine.createSpyObj('ActivatedRoute', ['get']);
  const attractionSpy = jasmine.createSpyObj('LocationService', ['get']);
  const categoryAttractionSpy = jasmine.createSpyObj('CategoryAttractionService', ['getAttraction']);
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
      declarations: [ PuzzleTabPageComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        PuzzleTabPageComponent,
        {provide: ActiveAttractionService, useValue: activeAttractionSpy},
        {provide: ActivatedRoute, useValue: activatedRouteSpy},
        {provide: CategoryAttractionService, useValue: categoryAttractionSpy},
        {provide: LocationService, useValue: attractionSpy},
        {provide: MapDataService, useValue: mapDataSpy},
        {provide: Router, useValue: routerSpy},
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PuzzleTabPageComponent);
    component = fixture.componentInstance;
    component.attraction = AttractionMock.createAttractionMock(123);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getAttraction to retrieve the instance to be edited', () => {
    expect(categoryAttractionSpy.getAttraction).toHaveBeenCalled();
  });

});
