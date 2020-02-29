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
  Attraction,
  Category,
  CategoryAttractionService,
  CategoryService,
  LocationService,
  LocationType,
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

function createCategory(inputId): Category {
  return {
    id: inputId,
    name: 'Cat ' + inputId,
    icon: 'icon-' + inputId,
    description: 'Test Category',
    iconColor: 'brown'
  };
}

function createAttraction(inputId): Attraction {
  return {
    id: inputId,
    name: 'Test Name',
    nodeId: 234,
    readinessLevel: 'DRAFT',
    latLon: null,
    locationTypeId: 4,
    mainLink: {
      id: 1,
      link: 'http://nowhere',
    },
    featuredImage: null
  };
}

function createLocType(index): LocationType {
  return {
    id: index,
    name: 'LocType-' + index,
    description: 'Testing',
    category: null,
    icon: 'icon-' + index,
  };
}

describe('DraftTabPage', () => {
  let component: DraftTabPage;
  let toTest: DraftTabPage;

  let fixture: ComponentFixture<DraftTabPage>;
  const category1 = createCategory(1);
  const category2 = createCategory(1);

  const locType0 = createLocType(0);
  const locType1 = createLocType(1);
  const locType2 = createLocType(2);

  const activeAttractionSpy = jasmine.createSpyObj('ActiveAttractionService', ['setActiveAttractionId']);
  const activatedRouteSpy = jasmine.createSpyObj('ActivatedRoute', ['get']);
  const categorySpy = jasmine.createSpyObj('CategoryService', ['get']);
  const categoryAttractionSpy = jasmine.createSpyObj('CategoryAttractionService', ['getAttraction']);
  const attractionSpy = jasmine.createSpyObj('LocationService', ['get']);
  const locationTypeSpy = jasmine.createSpyObj('LocTypeService', [
    'getById',
    'getByCategoryId'
  ]);
  const mapDataSpy = jasmine.createSpyObj('MapDataService', ['getAttractionById']);

  const routerSpy = jasmine.createSpyObj('Router', ['get']);

  beforeEach(async(() => {
    activatedRouteSpy.queryParams = of(true);
    activatedRouteSpy.snapshot = new MockParamMap();
    activatedRouteSpy.snapshot.paramMap.get = jasmine.createSpy('get').and.returnValue('42');

    categoryAttractionSpy.getAttraction = jasmine.createSpy('getAttraction').and.returnValue(
      createAttraction(123)
    );

    locationTypeSpy.getById = jasmine.createSpy('getById').and.returnValue({
      category: category1
    });

    TestBed.configureTestingModule({
      declarations: [ DraftTabPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        DraftTabPage,
        {provide: ActiveAttractionService, useValue: activeAttractionSpy},
        {provide: ActivatedRoute, useValue: activatedRouteSpy},
        {provide: CategoryService, useValue: categorySpy},
        {provide: CategoryAttractionService, useValue: categoryAttractionSpy},
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
    toTest = component;
    component.categories = [
      category1,
      category2
    ];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(toTest).toBeTruthy();
  });

  it('should call getAttraction to retrieve the instance to be edited', () => {
    expect(categoryAttractionSpy.getAttraction).toHaveBeenCalled();
  });

  describe('locTypeSelectedText', () => {

    it('should return null if no attraction', () => {
      /* setup data */
      toTest.attraction = null;

      /* make call */
      const actual = toTest.locTypeSelectedText();

      /* verify results */
      expect(actual).toBeNull();
    });

    it('should return null if attraction\'s LocTypeId is 0', () => {
      /* setup data */
      toTest.attraction = createAttraction(123);
      toTest.attraction.locationTypeId = 0;

      /* make call */
      const actual = toTest.locTypeSelectedText();

      /* verify results */
      expect(actual).toBeNull();
    });

    it('should return null if locTypes isn\'t defined', () => {
      /* setup data */
      toTest.attraction = createAttraction(123);
      toTest.locTypes = null;

      /* make call */
      const actual = toTest.locTypeSelectedText();

      /* verify results */
      expect(actual).toBeNull();
    });

    it('should return name of matching Loc Type if attraction\'s LocTypeId is valid', () => {
      /* setup data */
      toTest.attraction = createAttraction(123);
      toTest.attraction.locationTypeId = 1;
      toTest.locTypes = [
        locType0,
        locType1,
        locType2
      ];

      /* make call */
      const actual = toTest.locTypeSelectedText();

      /* verify results */
      expect(actual).toEqual('LocType-1');
    });

  });

});
