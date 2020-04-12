import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {
  async,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';
import {ActivatedRoute} from '@angular/router';
import {CourseAttractionService} from 'cr-lib';
import {of} from 'rxjs';

import {AttractionPage} from './attraction.page';

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

describe('AttractionPage', () => {
  let toTest: AttractionPage;
  let fixture: ComponentFixture<AttractionPage>;

  const activatedRouteSpy = jasmine.createSpyObj('ActivatedRoute', ['get']);
  const attractionSpy = jasmine.createSpyObj('CourseAttractionService', ['getAttraction']);

  beforeEach(async(() => {
    activatedRouteSpy.queryParams = of(true);
    activatedRouteSpy.snapshot = new MockParamMap();
    activatedRouteSpy.snapshot.paramMap.get = jasmine.createSpy('get').and.returnValue('42');
    TestBed.configureTestingModule({
      declarations: [ AttractionPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        AttractionPage,
        {provide: ActivatedRoute, useValue: activatedRouteSpy},
        {provide: CourseAttractionService, useValue: attractionSpy},
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttractionPage);
    toTest = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(toTest).toBeTruthy();
  });

  describe('openAttractionLink', () => {

    it('should be exposed', () => {
      expect(toTest.openAttractionLink).toBeDefined();
    });

  });

});
