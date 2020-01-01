import {Injectable} from '@angular/core';
import {
  Observable,
  ReplaySubject
} from 'rxjs';

/**
 * Responsibility for knowing which Attraction (by ID) is the one
 * being actively worked.
 *
 * This handles the situation where two different modules need to
 * know about the path param info on a router path -- stick it in
 * a service that can be injected into both.
 */
@Injectable({
  providedIn: 'root'
})
export class ActiveAttractionService {

  private activeAttractionSubject: ReplaySubject<number>;

  constructor(
  ) {
    /* Only hang onto the last value supplied -- bufferSize: 1 */
    this.activeAttractionSubject = new ReplaySubject<number>(1);
  }

  public setActiveAttractionId(attractionId: number) {
    console.log('Active Attraction ID is ', attractionId);
    this.activeAttractionSubject.next(attractionId);
  }

  public getActiveAttractionId(): Observable<number> {
    return this.activeAttractionSubject.asObservable();
  }

}
