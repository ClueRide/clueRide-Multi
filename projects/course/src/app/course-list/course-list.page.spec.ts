import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {
  async,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import {CourseListPage} from './course-list.page';

describe('CourseListPage', () => {
  let component: CourseListPage;
  let fixture: ComponentFixture<CourseListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
