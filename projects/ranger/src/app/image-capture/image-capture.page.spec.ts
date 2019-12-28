import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {
  async,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import {ImageCapturePage} from './image-capture.page';

describe('ImageCapturePage', () => {
  let component: ImageCapturePage;
  let fixture: ComponentFixture<ImageCapturePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageCapturePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageCapturePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
