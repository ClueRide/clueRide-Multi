import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {
  async,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';
import {GuideEventService} from '../state/guide-event.service';

import {TeamPage} from './team.page';

describe('TeamPage', () => {
  let component: TeamPage;
  let fixture: ComponentFixture<TeamPage>;

  const guideEventSpy = jasmine.createSpyObj('GuideEventService', [
    'isCurrentMemberGuide',
    'signalTeamAssembled'
  ]);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamPage ],
      providers: [
        TeamPage,
        {provide: GuideEventService, useValue: guideEventSpy},
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
