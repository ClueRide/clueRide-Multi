import {
  HttpClientTestingModule,
  HttpTestingController,
  TestRequest
} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {
  AuthHeaderService,
  BASE_URL,
  ServerEventsService
} from 'cr-lib';
import {of} from 'rxjs';
import {GameState} from './game-state';
import {GameStateMock} from './game-state.mock';

import {GameStateService} from './game-state.service';

const authHeaderSpy = jasmine.createSpyObj('AuthHeaderService', ['getAuthHeaders']);
const sseSpy = jasmine.createSpyObj('ServerEventsService', ['getGameStateEventObservable']);

let getGameStateObservableSpy;

describe('GameStateService', () => {
  let toTest: GameStateService,
    httpMock: HttpTestingController,
    gameStateMock: GameStateMock;

  beforeEach( () => {
    getGameStateObservableSpy = sseSpy.getGameStateEventObservable.and.returnValue(of({}));

    TestBed.configureTestingModule({
      providers: [
        GameStateService,
        GameStateMock,
        {provide: AuthHeaderService, useValue: authHeaderSpy},
        {provide: ServerEventsService, useValue: sseSpy},
      ],
      imports: [
        HttpClientTestingModule
      ]
    });

    toTest = TestBed.get(GameStateService);
    httpMock = TestBed.get(HttpTestingController);
    gameStateMock = TestBed.get(GameStateMock);
  });

  it('should be created', () => {
    expect(toTest).toBeTruthy();
  });

  describe('getGameState', () => {

    it('should be exposed on the service', () => {
      expect(toTest.getGameState).toBeDefined();
    });

    it('should block until a Game State event becomes available', () => {
      /* setup data */
      let gotGameState = false;

      /* make call */
      toTest.getGameState().subscribe(
        (gameState) => {
          gotGameState = true;
        }
      );

      /* verify results */
      expect(gotGameState).toBeFalsy();
    });

    it('should return fully-populated game state if it is already available', () => {
      /* setup data */
      let actual: GameState;
      const expected: GameState = gameStateMock.generateInitialMock();

      /* Inserts a Game State as if it came from SSE. */
      toTest.updateFromSSE({
        event: 'Testing',
        gameState: expected
      });

      /* make call */
      toTest.getGameState().subscribe(
        (gameState) => {
          actual = gameState;
        }
      );

      /* verify results */
      expect(actual).toEqual(expected);
    });

    it('should return fully-populated game state if it becomes available', () => {
      /* setup data */
      let actual: GameState;
      const expected: GameState = gameStateMock.generateInitialMock();

      /* make call */
      toTest.getGameState().subscribe(
        (gameState) => {
          actual = gameState;
        }
      );

      /* Inserts a Game State as if it came from SSE. */
      toTest.updateFromSSE({
        event: 'Testing',
        gameState: expected
      });

      /* verify results */
      expect(actual).toEqual(expected);
    });

  });

  describe('requestGameState', () => {

    it('should be defined', () => {
      expect(toTest.requestGameState).toBeDefined();
    });

    it('should make no Game State calls to back-end if not requested', () => {
      httpMock.expectNone(BASE_URL + 'game-state');
      httpMock.verify();
    });

    it('should make exactly one call to back-end when requested', () => {
      /* make call */
      toTest.requestGameState();

      const gameStateRequest: TestRequest = httpMock.expectOne(BASE_URL + 'game-state');
      gameStateRequest.flush(gameStateMock.generateInitialMock());

      /* verify results */
      expect(authHeaderSpy.getAuthHeaders).toHaveBeenCalled();
      httpMock.verify();
    });

    it('should make no further calls to back-end if this call is made more than once', () => {
      /* make call */
      toTest.requestGameState();
      toTest.requestGameState();

      const gameStateRequest: TestRequest = httpMock.expectOne(BASE_URL + 'game-state');
      gameStateRequest.flush(gameStateMock.generateInitialMock());

      /* verify results */
      expect(authHeaderSpy.getAuthHeaders).toHaveBeenCalled();
      httpMock.verify();
    });

  });

});
