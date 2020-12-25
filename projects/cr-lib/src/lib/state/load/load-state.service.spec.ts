import {HttpClient} from '@angular/common/http';
import {TestBed} from '@angular/core/testing';
import {of} from 'rxjs';
import {GameStateService} from '../game/game-state.service';

import {LoadStateService} from './load-state.service';
import {CourseAttractionService} from '../../api/attraction/course/course-attraction.service';
import {CourseService} from '../../api/course/course.service';
import {OutingService} from '../../api/outing/outing.service';
import {PathService} from '../../api/path/path.service';
import {PuzzleService} from '../../api/puzzle/puzzle.service';
import {ServerEventsService} from '../../sse-event/sse-event.service';
import {TeamService} from '../../api/team/team.service';

describe('LoadStateService', () => {
  beforeEach(
    () => {
      const httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
      const attractionSpy = jasmine.createSpyObj('CourseAttractionService', ['get']);
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
            {provide: CourseAttractionService, useValue: attractionSpy},
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
