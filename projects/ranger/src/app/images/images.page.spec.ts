import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {
  async,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';
import {Router} from '@angular/router';
import {
  AttractionMock,
  CategoryAttractionService,
  ImageService
} from 'cr-lib';
import {of} from 'rxjs';
import {ActiveAttractionService} from '../edit/active-attraction.service';
import {MapDataService} from '../map/data/map-data.service';

import {ImagesPage} from './images.page';

const activeAttractionSpy = jasmine.createSpyObj('ActiveAttractionService', ['getActiveAttractionId']);
const categoryAttractionSpy = jasmine.createSpyObj('CategoryAttractionService', ['getAttraction']);
const imageSpy = jasmine.createSpyObj('ImageService', ['getAllImagesForLocation']);
const mapDataSpy = jasmine.createSpyObj('MapDataService', ['getAttractionById']);
const routerSpy = jasmine.createSpyObj('Router', ['get']);

describe('ImagesPage', () => {
  let component: ImagesPage;
  let fixture: ComponentFixture<ImagesPage>;

  activeAttractionSpy.getActiveAttractionId = jasmine.createSpy(
    'getActiveAttractionId'
  ).and.returnValue(of(123));

  categoryAttractionSpy.getAttraction = jasmine.createSpy(
    'getAttraction').and.returnValue(
    AttractionMock.createAttractionMock(123)
  );

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
        {provide: CategoryAttractionService, useValue: categoryAttractionSpy},
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

  it('should call getAttraction to retrieve the instance to be edited', () => {
    expect(categoryAttractionSpy.getAttraction).toHaveBeenCalled();
  });

});
