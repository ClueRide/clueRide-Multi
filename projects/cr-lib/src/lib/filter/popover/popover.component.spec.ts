import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {
  async,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import {FilterPopoverComponent} from './popover.component';
import {FilterService} from '../filter.service';
import {CategoryService} from '../../api/category/category.service';
import {CourseService} from '../../api/course/course.service';
import {from} from 'rxjs';

describe('FilterPopoverComponent', () => {
  const filterSpy = jasmine.createSpyObj('FilterService', ['getCurrentFilter']);
  const categorySpy = jasmine.createSpyObj('CategoryService', ['getAllCategories']);
  const courseSpy = jasmine.createSpyObj('CourseService', ['getAllCourses']);

  let toTest: FilterPopoverComponent;
  let fixture: ComponentFixture<FilterPopoverComponent>;

  beforeEach(async(() => {
    courseSpy.getAllCourses = jasmine.createSpy('getAllCourses').and.returnValue(from([]));
    filterSpy.getCurrentFilter = jasmine.createSpy('getCurrentFilter').and.returnValue(
      {
        categoriesToIncludeById: [],
        isEmpty: true,
        outingToInclude: null
      }
    );

    TestBed.configureTestingModule({
      declarations: [ FilterPopoverComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        FilterPopoverComponent,
        { provide: FilterService, useValue: filterSpy },
        { provide: CategoryService, useValue: categorySpy },
        { provide: CourseService, useValue: courseSpy },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {

    fixture = TestBed.createComponent(FilterPopoverComponent);
    toTest = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(toTest).toBeTruthy();
  });

});
