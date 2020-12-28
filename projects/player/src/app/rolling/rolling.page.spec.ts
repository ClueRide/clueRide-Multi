import {HttpClient} from '@angular/common/http';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {
  async,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';
import {Router} from '@angular/router';
import {
  CourseAttractionService,
  GameMarkerService,
  GameState,
  GameStateService,
  OutingService,
  PathService
} from 'cr-lib';
import {of} from 'rxjs';
import {GuideEventService} from '../state/guide-event.service';

import {RollingPage} from './rolling.page';

describe('RollingPage', () => {
  let component: RollingPage;
  let fixture: ComponentFixture<RollingPage>;

  const attractionSpy = jasmine.createSpyObj('CourseAttractionService', ['isRolling']);
  const gameStateSpy = jasmine.createSpyObj('GameStateService', ['isRolling', 'requestGameState']);
  const guideEventSpy = jasmine.createSpyObj('GuideEventService', {
    isCurrentMemberGuide: jasmine.createSpy()
  });
  const markerSpy = jasmine.createSpyObj('GameMarkerService', ['get']);
  const outingSpy = jasmine.createSpyObj('OutingService', ['get']);
  const pathSpy = jasmine.createSpyObj('PathService', ['get']);
  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
  const httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);

  beforeEach(async(() => {

    gameStateSpy.requestGameState = jasmine.createSpy('requestGameState').and.returnValue(of(new GameState()));

    TestBed.configureTestingModule({
      declarations: [ RollingPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        RollingPage,
        {provide: CourseAttractionService, useValue: attractionSpy},
        {provide: GameStateService, useValue: gameStateSpy},
        {provide: GuideEventService, useValue: guideEventSpy},
        {provide: GameMarkerService, useValue: markerSpy},
        {provide: OutingService, useValue: outingSpy},
        {provide: PathService, useValue: pathSpy},
        {provide: Router, useValue: routerSpy},
        {provide: HttpClient, useValue: httpClientSpy}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RollingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
