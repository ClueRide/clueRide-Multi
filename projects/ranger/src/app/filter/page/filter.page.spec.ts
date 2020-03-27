import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {
  async,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';
import {
  CategoryService,
  CourseService
} from 'cr-lib';
import {of} from 'rxjs';

import {FilterPage} from './filter.page';

describe('FilterPage', () => {
  let component: FilterPage;
  let fixture: ComponentFixture<FilterPage>;

  const courseSpy = jasmine.createSpyObj('CourseService', ['getAllCourses']);
  const categorySpy = jasmine.createSpyObj('CategoryService', ['getAllCategories']);

  beforeEach(async(() => {

    courseSpy.getAllCourses = jasmine.createSpy('getAllCourses').and.returnValue(of([]));
    categorySpy.getAllCategories = jasmine.createSpy('getAllCategories').and.returnValue(of([]));

    TestBed.configureTestingModule({
      declarations: [ FilterPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        FilterPage,
        {provide: CategoryService, useValue: categorySpy},
        {provide: CourseService, useValue: courseSpy},
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
