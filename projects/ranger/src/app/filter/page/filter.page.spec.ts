import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {
  async,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';
import {
  CategoryService,
  CourseService,
  Filter,
  FilterService
} from 'cr-lib';

import {FilterPageComponent} from './filter.page';
import {from} from 'rxjs';

const courseSpy = jasmine.createSpyObj('CourseService', ['getAllCourses']);
const categorySpy = jasmine.createSpyObj('CategoryService', ['getAllCategories']);
const filterSpy = jasmine.createSpyObj('FilterService', ['getCurrentFilter']);

const emptyFilter: Filter = {
  categoriesToIncludeById: [],
  isEmpty: true,
  outingToInclude: null
};

describe('FilterPage', () => {
  let component: FilterPageComponent;
  let fixture: ComponentFixture<FilterPageComponent>;

  beforeEach(async(() => {

    courseSpy.getAllCourses = jasmine.createSpy('getAllCourses').and.returnValue(from([]));
    // categorySpy.getAllCategories = jasmine.createSpy('getAllCategories').and.returnValue(of([]));
    filterSpy.getCurrentFilter = jasmine.createSpy('getCurrentFilter').and.returnValue(emptyFilter);

    TestBed.configureTestingModule({
      declarations: [ FilterPageComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        FilterPageComponent,
        {provide: CategoryService, useValue: categorySpy},
        {provide: CourseService, useValue: courseSpy},
        {provide: FilterService, useValue: filterSpy},
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
