import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {
  AuthHeaderService,
  BASE_URL,
  ServerEventsService
} from 'cr-lib';
import {
  Observable,
  ReplaySubject,
  Subject,
  Subscription
} from 'rxjs';
import {GameState} from './game-state';

@Injectable({
  providedIn: 'root'
})
export class GameStateService {
  private totallyDifferentSubject: Subject<GameState>;
  readonly totallyDifferentObservable: Observable<GameState>;

  private gameStateSubject: Subject<GameState>;
  readonly gameStateObservable: Observable<GameState>;
  readonly puzzleEvent$: Subject<GameState>;
  readonly rollingEvent$: Subject<GameState>;

  private sseSubscription: Subscription;

  private cachedGameState: GameState;
  private gameStateAlreadyRequested: boolean;

  constructor(
    private http: HttpClient,
    private authHeaderService: AuthHeaderService,
    private sseService: ServerEventsService,
  ) {
    console.log('Hello GameStateService Provider');
    this.gameStateSubject = new ReplaySubject(1);
    this.gameStateObservable = this.gameStateSubject.asObservable();

    this.totallyDifferentSubject = new ReplaySubject(1);
    this.totallyDifferentObservable = this.totallyDifferentSubject.asObservable();

    this.puzzleEvent$ = new Subject<GameState>();
    this.rollingEvent$ = new Subject<GameState>();

    /* Not making direct calls to the back-end until we're asked to do so, and we're going to only do it once. */
    this.gameStateAlreadyRequested = false;

    /* DO not kick off an initial subscription until we're ready for this. */
    // this.setupSseEventSubscription();

    this.cachedGameState = {
      teamAssembled: false,
      rolling: false,
      nextLocationName: '',
      outingState: 'IN_PROGRESS',
      pathIndex: -1,
      locationId: null,
      puzzleId: null
    };

  }

  setupSseEventSubscription() {
    console.log('Listening to SSE Events for Game State');
    this.sseSubscription = this.sseService.getGameStateEventObservable()
      .subscribe(
        (event) => this.updateFromSSE(event)
      );
  }

  ngOnInit() {
  }

  /**
   * Instead of sitting around until a change of GameState occurs, this method makes it possible to retrieve the
   * last game state.
   */
  getGameState(): Observable<GameState> {
    return this.gameStateObservable;
  }

  /**
   * This responds to Server Sent Events (SSE) and echos them
   * as GameState instances published on the `gameStateObservable()`.
   */
  updateFromSSE(gameStateEvent: any) {
    const gameState: GameState = gameStateEvent.gameState;
    const eventType = gameStateEvent.event;
    this.cachedGameState = gameState;

    /* Feed one of the two channels based on the event type. */
    switch (eventType) {
      case 'Team Assembled':
      case 'Arrival':
        this.puzzleEvent$.next(gameState);
        break;
      case 'Departure':
        this.rollingEvent$.next(gameState);
        break;
      default:
        console.log('Unrecognized Event: ' + eventType);
        break;
    }

    /* Generic notification of new Game State. */
    this.gameStateSubject.next(gameState);
  }

  puzzleEvents(): Observable<GameState> {
    return this.puzzleEvent$;
  }

  rollingEvents(): Observable<GameState> {
    return this.rollingEvent$;
  }

  /**
   * This allows requesting the Game State instead of waiting for a
   * Server Sent Event (SSE) to occur.
   *
   * Uses the same observable to pass along Game State changes.
   */
  // TODO: CI-143: This should only be invoked when nothing else has invoked it. All other clients wishing to
  // pickup the GameState prior to receiving the events should pull from a ReplaySubject that holds the
  // most recent state.
  requestGameState(): Observable<GameState> {
    console.log('Explicit Request for Game State');
    if (this.gameStateAlreadyRequested) {
      console.log('There has already been a call to request an initial game state; no need to make this call');
      return this.gameStateObservable;
    }

    this.gameStateAlreadyRequested = true;

    this.http.get(
      BASE_URL + 'game-state',
      {headers: this.authHeaderService.getAuthHeaders()}
    ).subscribe(
      (response) => {
        const gameState: GameState = response as GameState;
        this.cachedGameState = gameState;
        this.gameStateSubject.next(gameState);
      }
    );
    return this.gameStateObservable;
  }

  getOutingState(): string {
    return this.cachedGameState.outingState;
  }

  /**
   * Tells whether or not the Game has started.
   *
   * This implementation based the start of the game on whether "team Assembled" is true.
   */
  isGameStarted(): boolean {
    return this.cachedGameState.teamAssembled;
  }

  /**
   * Tells whether or not we're rolling.
   */
  isRolling(): boolean {
    return this.cachedGameState.rolling;
  }

  ngOnDestroy() {
    console.log('Un-subscribing to SSE Events for Game State');
    this.sseSubscription.unsubscribe();
  }

}
