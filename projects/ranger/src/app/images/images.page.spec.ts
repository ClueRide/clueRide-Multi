import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {
  async,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';
import {Router} from '@angular/router';
import {ImageService} from 'cr-lib';
import {of} from 'rxjs';
import {ActiveAttractionService} from '../edit/active-attraction.service';
import {MapDataService} from '../map/data/map-data.service';

import {ImagesPage} from './images.page';

const activeAttractionSpy = jasmine.createSpyObj('ActiveAttractionService', ['getActiveAttractionId']);
const imageSpy = jasmine.createSpyObj('ImageService', ['getAllImagesForLocation']);
const mapDataSpy = jasmine.createSpyObj('MapDataService', ['getAttractionById']);
const routerSpy = jasmine.createSpyObj('Router', ['get']);

describe('ImagesPage', () => {
  let component: ImagesPage;
  let fixture: ComponentFixture<ImagesPage>;

  activeAttractionSpy.getActiveAttractionId = jasmine.createSpy(
    'getActiveAttractionId'
  ).and.returnValue(of(123));

  mapDataSpy.getAttractionById = jasmine.createSpy(
    'getAttractionById').and.returnValue(
    {
      id: 123,
      name: 'Test Name',
      nodeId: 234,
      readinessLevel: 'DRAFT',
      latLon: null,
      locationTypeId: 4,
      featuredImage: undefined
    });

  imageSpy.getAllImagesForLocation = jasmine.createSpy(
    'getAllImagesForLocation'
  ).and.returnValue(of([]));

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImagesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        ImagesPage,
        {provide: ActiveAttractionService, useValue: activeAttractionSpy},
        {provide: ImageService, useValue: imageSpy},
        {provide: MapDataService, useValue: mapDataSpy},
        {provide: Router, useValue: routerSpy},
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImagesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
