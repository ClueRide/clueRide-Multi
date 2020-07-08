import {TestBed} from '@angular/core/testing';

import {EditedCourseService} from './edited-course.service';

describe('EditedCourseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EditedCourseService = TestBed.get(EditedCourseService);
    expect(service).toBeTruthy();
  });
});
