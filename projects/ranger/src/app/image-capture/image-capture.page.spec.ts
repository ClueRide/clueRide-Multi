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
import {Camera} from '@ionic-native/camera/ngx';
import {LoadingController} from '@ionic/angular';
import {ImageService} from 'cr-lib';
import {of} from 'rxjs';

import {ImageCapturePage} from './image-capture.page';

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

class MockCamera {
  DestinationType: {
    DATA_URL: 'file:'
  };
  EncodingType: {
    JPEG: true
  };
}

describe('ImageCapturePage', () => {
  let component: ImageCapturePage;
  let fixture: ComponentFixture<ImageCapturePage>;

  const activatedRouteSpy = jasmine.createSpyObj('ActivatedRoute', ['get']);
  const imageSpy = jasmine.createSpyObj('ImageService', ['get']);
  const loadingSpy = jasmine.createSpyObj('LoadingController', ['get']);
  const routerSpy = jasmine.createSpyObj('Router', ['getCurrentNavigation']);

  beforeEach(async(() => {
    activatedRouteSpy.queryParams = of(true);
    activatedRouteSpy.snapshot = new MockParamMap();
    activatedRouteSpy.snapshot.paramMap.get = jasmine.createSpy('get').and.returnValue('42');

    routerSpy.getCurrentNavigation = jasmine.createSpy('getCurrentNavigation').and.returnValue({
      extras: {
        state: {
          attraction: {
            id: 123,
            name: 'Test Name',
            nodeId: 234,
            readinessLevel: 'DRAFT',
            latLon: null,
            locationTypeId: 4,
            featuredImage: null
          }
        }
      }
    });

    const mockCamera = new MockCamera();
    mockCamera.DestinationType = {DATA_URL: 'file:'};
    mockCamera.EncodingType = {JPEG: true};

    TestBed.configureTestingModule({
      declarations: [ ImageCapturePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        ImageCapturePage,
        {provide: ActivatedRoute, useValue: activatedRouteSpy},
        {provide: Camera, useValue: mockCamera},
        {provide: ImageService, useValue: imageSpy},
        {provide: LoadingController, useValue: loadingSpy},
        {provide: Router, useValue: routerSpy},
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageCapturePage);
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
