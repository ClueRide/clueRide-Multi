import {Injectable} from '@angular/core';
import {
  Observable,
  ReplaySubject,
  Subject
} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {GameStateService} from '../game/game-state.service';
import {CourseAttractionService} from '../../api/attraction/course/course-attraction.service';
import {CourseService} from '../../api/course/course.service';
import {OutingService} from '../../api/outing/outing.service';
import {Outing} from '../../api/outing/outing';
import {PathService} from '../../api/path/path.service';
import {PuzzleService} from '../../api/puzzle/puzzle.service';
import {ServerEventsService} from '../../sse-event/sse-event.service';
import {TeamService} from '../../api/team/team.service';

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
    private courseAttractionService: CourseAttractionService,
    private courseService: CourseService,
    private gameStateService: GameStateService,
    private outingService: OutingService,
    private pathService: PathService,
    private puzzleService: PuzzleService,
    private serverEventsService: ServerEventsService,
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
    this.courseAttractionService.loadCourseAttractions()
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
    // TODO: CI-143, this could be the single appropriate place to kick-off a read from the server regarding game-state.
    this.gameStateService.requestGameState()
      .pipe(
        takeUntil(this.loadStateObservable)
      ).subscribe(
        () => {
          /* Signal we're done. */
          console.log('Completed loading Course, Location, Game State and Puzzles');
          this.allCachedUp = true;

          /* Turns on SSE against our session's Outing ID. */
          this.serverEventsService.openChannel(
            this.outing.id
          );

          /* Let rest of world know. */
          this.loadStateSubject.next(true);
        }
      );
  }


}
