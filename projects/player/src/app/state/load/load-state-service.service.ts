import {Injectable} from '@angular/core';
import {
  AttractionService,
  CourseService,
  Outing,
  OutingService,
  PathService,
  PuzzleService,
  ServerEventsService,
  TeamService
} from 'cr-lib';
import {
  Observable,
  ReplaySubject,
  Subject
} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {GameStateService} from '../../game/game-state.service';

@Injectable({
  providedIn: 'root'
})
export class LoadStateService {

  private outing: Outing;
  private allCachedUp = false;
  private loadInProgress = false;
  private loadStateSubject: Subject<boolean>;
  private readonly loadStateObservable: Observable<boolean>;

  constructor(
    private outingService: OutingService,
    private courseService: CourseService,
    private gameStateService: GameStateService,
    private attractionService: AttractionService,
    private pathService: PathService,
    private serverEventsService: ServerEventsService,
    private puzzleService: PuzzleService,
    private teamService: TeamService,
  ) {
    console.log('Hello LoadStateService');
    this.loadStateSubject = new ReplaySubject<boolean>(1);
    this.loadStateObservable = this.loadStateSubject.asObservable();
  }

  /**
   * Entry point for kicking off loading the Outing.
   *
   * In sequence, brings in the entire set of data for a course.
   *
   * Should only be called by a single client; there's a guard in
   * case two clients attempt to load this -- or if the same client
   * attempts more than once.
   */
  public loadOutingData() {
    if (this.isLoadComplete()) {
      console.log('Load is Complete');
      return;
    }
    if (this.loadInProgress) {
      console.log('Load is in Progress');
      return;
    }
    this.outingService.getSessionOuting()
      .pipe(
        takeUntil(this.loadStateObservable)
      ).subscribe(
        (response) => {
          this.outing = response as Outing;
          /* Kick off loads of everything needing the Outing ID: */
          this.loadCourseData();
          this.teamService.loadTeam(this.outing.teamId);
        }
      );
  }

  /**
   * Any client wishing to hold off on its operation until the
   * Course has been cached should wait on this Observable.
   */
  public getLoadStateObservable(): Observable<boolean> {
    return this.loadStateObservable;
  }

  /**
   * Set to true once all data has been sequentially loaded.
   */
  public isLoadComplete(): boolean {
    return this.allCachedUp;
  }

  private loadCourseData() {
    this.courseService.getSessionCourse()
      .pipe(
        takeUntil(this.loadStateObservable)
      ).subscribe(
        (course) => {
          /* Kick off loads of everything needing the Course. */
          this.loadLocationData();
          this.pathService.loadPaths(course);
        }
      );

  }

  private loadLocationData() {
    this.attractionService.loadSessionAttractions()
      .pipe(
        takeUntil(this.loadStateObservable)
      ).subscribe(
        () => {
          this.loadPuzzleData();
        }
      );

  }

  private loadPuzzleData() {
    this.puzzleService.loadSessionPuzzles()
      .pipe(
        takeUntil(this.loadStateObservable)
      ).subscribe(
        () => {
          this.loadGameState();
        }
      );
  }

  private loadGameState() {
    /* This service doesn't use the game state.
     * It only makes sure the server has game state available before proceeding. */
    this.gameStateService.requestGameState()
      .pipe(
        takeUntil(this.loadStateObservable)
      ).subscribe(
        () => {
          /* Signal we're done. */
          console.log('Completed loading Course, Location, Game State and Puzzles');
          this.allCachedUp = true;

          /* Turns on SSE against our session's Outing ID. */
          // TODO: PLAY-22 When does this turn off? Application life-cycle?
          this.serverEventsService.initializeSubscriptions(
            this.outing.id
          );

          /* Let rest of world know. */
          this.loadStateSubject.next(true);
        }
      );
  }


}
