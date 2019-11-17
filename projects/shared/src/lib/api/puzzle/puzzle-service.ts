import {AttractionService} from '../attraction/attraction-service';
import {HttpClient} from '@angular/common/http';
import {BASE_URL, HttpService} from '../http/http.service';
import {Injectable} from '@angular/core';
import {Location} from '../location/location';
import {Puzzle} from './puzzle';
import {from, Observable, Subject} from 'rxjs';

/* Define structure for storing array of Puzzles per Attraction ID. */
interface PuzzlesPerAttractionId {
  [attractionId: number]: Puzzle[];
}

interface PuzzlesById {
  [puzzleId: number]: Puzzle;
}

/**
 * Provides for both Puzzles against a Location during editing
 * of that location, as well as the Session Cache of during game play.
 *
 * Functions referring to Location are for editing.
 * Functions referring to Attraction are for playing.
 *
 * Caching service for the Puzzles and Answers associated with
 * each Attraction that is part of the Session's Course.
 * This cache of data is static for the duration of the session.
 */
@Injectable()
export class PuzzleService {
  private puzzles: PuzzlesById = {};

  private puzzlesPerAttractionId: PuzzlesPerAttractionId = {};
  private expectedAttractionCount: number;
  private attractionCount = 0;

  constructor(
    public http: HttpClient,
    private httpService: HttpService,
    private attractionService: AttractionService,
  ) {
    console.log('Hello PuzzleService');
  }

  /* Editing Puzzles for prospective Locations. */

  /**
   * Returns Observable against the Puzzle REST API endpoint for
   * the given Location ID.
   * @param locationId unique identifier for the Location.
   */
  public getPuzzles(locationId: number): Observable<Puzzle[]> {
    return this.http.get<Puzzle[]>(
      BASE_URL + 'puzzle/location/' + locationId,
      {headers: this.httpService.getAuthHeaders()}
    );
  }

  /** Provides an empty puzzle created by the Server. */
  public getBlankPuzzleForLocation(location: Location): Observable<Puzzle> {
    return this.http.post<Puzzle>(
      BASE_URL + 'puzzle/blank',
      location,
      {headers: this.httpService.getAuthHeaders()}
    );
  }

  /** After making changes, post the updates to the puzzle. */
  public savePuzzle(
    puzzle: Puzzle
  ): Observable<Puzzle> {
    return this.http.post<Puzzle>(
      BASE_URL + 'puzzle',
      puzzle,
      {headers: this.httpService.getAuthHeaders()}
    );
  }

  /* Caching Puzzles against Attractions. */

  /**
   * Build our Session's cache of Puzzles per Attraction ID.
   *
   * This also returns an observable that provides a marble when this is
   * completely loaded.
   */
  public loadSessionPuzzles(): Observable<any> {
    const puzzleSubject: Subject<boolean> = new Subject();
    const attractions = this.attractionService.getAttractions();
    this.expectedAttractionCount = attractions.length;
    for (const attraction of attractions) {
      const attractionId: number = attraction.id;

      this.getPuzzles(attractionId).subscribe(
        (response) => {
          if (response && (response as Array<any>).length > 0) {
            const locId = response[0].locationId;
            this.puzzlesPerAttractionId[locId] = response as Puzzle[];
            /* Build array of all puzzles by ID. */
            from(response).subscribe(
              (puzzle) => {this.puzzles[puzzle.id] = puzzle; }
            );
          }
          this.attractionCount++;
          if (this.attractionCount === this.expectedAttractionCount) {
            puzzleSubject.next(true);
          }
        }
      );
    }
    return puzzleSubject.asObservable();
  }

  /**
   * Returns cached puzzles for the given Attraction ID.
   * @param attractionId unique identifier for the Attraction.
   */
  public getPuzzlesPerAttractionId(attractionId: number): Puzzle[] {
    return this.puzzlesPerAttractionId[attractionId];
  }

  /**
   * Returns a specific puzzle by ID.
   * @param puzzleId unique identifier for the specific puzzle.
   */
  getPuzzle(puzzleId: number): Puzzle {
    return this.puzzles[puzzleId];
  }

}
