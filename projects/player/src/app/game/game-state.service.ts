import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {
  AuthHeaderService,
  BASE_URL
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
  private gameStateSubject: Subject<GameState> = new ReplaySubject(1);
  private gameStateObservable: Observable<GameState> = this.gameStateSubject.asObservable();
  readonly puzzleEvent$: Subject<GameState>;
  readonly rollingEvent$: Subject<GameState>;

  private sseSubscription: Subscription;

  private cachedGameState: GameState;

  constructor(
    private http: HttpClient,
    private authHeaderService: AuthHeaderService,
    // private sseService: ServerEventsService,
  ) {
    console.log('Hello GameStateService Provider');
    this.puzzleEvent$ = new Subject<GameState>();
    this.rollingEvent$ = new Subject<GameState>();
    this.setupSseEventSubscription();

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
    // this.sseSubscription = this.sseService.getGameStateEventObservable()
    //   .subscribe(
    //     (event) => this.updateFromSSE(event)
    //   );
  }

  ngOnInit() {
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
  requestGameState(): Observable<GameState> {
    console.log('Explicit Request for Game State');
    this.http.get(
      BASE_URL + 'game-state',
      {
        headers: this.authHeaderService.getAuthHeaders()
      }
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

  ngOnDestroy() {
    console.log('Unsubscribing to SSE Events for Game State');
    this.sseSubscription.unsubscribe();
  }
}
