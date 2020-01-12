import {HttpClient} from '@angular/common/http';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {
  async,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';
import {
  AttractionService,
  OutingService,
  PathService,
  PoolMarkerService
} from 'cr-lib';
import {GameStateService} from '../state/game/game-state.service';
import {GuideEventService} from '../state/guide-event.service';

import {RollingPage} from './rolling.page';

describe('RollingPage', () => {
  let component: RollingPage;
  let fixture: ComponentFixture<RollingPage>;

  beforeEach(async(() => {
    const attractionSpy = jasmine.createSpyObj('AttractionService', ['isRolling']);
    const gameStateSpy = jasmine.createSpyObj('GameStateService', ['isRolling']);
    const guideEventSpy = jasmine.createSpyObj('GuideEventService', {
      isCurrentMemberGuide: jasmine.createSpy()
    });
    const markerSpy = jasmine.createSpyObj('PoolMarkerService', ['get']);
    const outingSpy = jasmine.createSpyObj('OutingService', ['get']);
    const pathSpy = jasmine.createSpyObj('PathService', ['get']);
    const httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    TestBed.configureTestingModule({
      declarations: [ RollingPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        RollingPage,
        {provide: AttractionService, useValue: attractionSpy},
        {provide: GameStateService, useValue: gameStateSpy},
        {provide: GuideEventService, useValue: guideEventSpy},
        {provide: PoolMarkerService, useValue: markerSpy},
        {provide: OutingService, useValue: outingSpy},
        {provide: PathService, useValue: pathSpy},
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
