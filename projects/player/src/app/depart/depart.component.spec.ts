import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {
  async,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';
import {GuideEventService} from '../state/guide-event.service';

import {DepartComponent} from './depart.component';

describe('DepartComponent', () => {
  let component: DepartComponent;
  let fixture: ComponentFixture<DepartComponent>;

  const guideEventSpy = jasmine.createSpyObj('GuideEventService', {
    isCurrentMemberGuide: jasmine.createSpy()
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepartComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        DepartComponent,
        {provide: GuideEventService, useValue: guideEventSpy},
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
