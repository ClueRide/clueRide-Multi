import {HttpClient} from '@angular/common/http';
import {TestBed} from '@angular/core/testing';
import {
  AttractionService,
  CourseService,
  OutingService,
  PathService,
  ServerEventsService,
  TeamService
} from 'cr-lib';
import {of} from 'rxjs';
import {PuzzleService} from '../../../../../cr-lib/src/lib/api/puzzle/puzzle.service';
import {GameStateService} from '../game/game-state.service';

import {LoadStateService} from './load-state.service';

describe('LoadStateService', () => {
  beforeEach(
    () => {
      const httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
      const attractionSpy = jasmine.createSpyObj('AttractionService', ['get']);
      const courseSpy = jasmine.createSpyObj('CourseService', ['get']);
      const gameStateSpy = jasmine.createSpyObj('GameStateService', ['get']);
      const outingSpy = jasmine.createSpyObj('OutingService', ['get']);
      const pathSpy = jasmine.createSpyObj('PathService', ['get']);
      const puzzleSpy = jasmine.createSpyObj('PathService', ['get']);
      const serverEventsSpy = jasmine.createSpyObj('ServerEventsService', {
        getGameStateEventObservable: () => of(true)
      });
      const teamSpy = jasmine.createSpyObj('TeamService', ['get']);

      TestBed.configureTestingModule(
        {
          providers: [
            LoadStateService,
            {provide: AttractionService, useValue: attractionSpy},
            {provide: CourseService, useValue: courseSpy},
            {provide: GameStateService, useValue: gameStateSpy},
            {provide: HttpClient, useValue: httpClientSpy},
            {provide: OutingService, useValue: outingSpy},
            {provide: PathService, useValue: pathSpy},
            {provide: PuzzleService, useValue: puzzleSpy},
            {provide: ServerEventsService, useValue: serverEventsSpy},
            {provide: TeamService, useValue: teamSpy},
          ]
        }
      );
    });

  it('should be created', () => {
    const service: LoadStateService = TestBed.get(LoadStateService);
    expect(service).toBeTruthy();
  });

});
