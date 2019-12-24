import {Injectable} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
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
    private activeRoute: ActivatedRoute
  ) {
    this.activeAttractionSubject = new ReplaySubject<number>();
  }

  public captureActiveAttractionFromRoute(): Observable<number> {
    this.activeRoute.queryParams.subscribe(
      (params) => {
        const attractionId = parseInt(this.activeRoute.snapshot.paramMap.get('id'), 10);
        console.log('Active Attraction', attractionId);
        this.activeAttractionSubject.next(attractionId);
      }
    );
    return this.activeAttractionSubject.asObservable();
  }

  public setActiveAttractionId(attractionId: number) {
    console.log('Active Attraction ID is ', attractionId);
    this.activeAttractionSubject.next(attractionId);
  }

  /* Considering this API for kicking off the router navigation. */
  public editAttractionWithId(attractionId: number) {
    this.activeAttractionSubject.next(attractionId);
  }

  public getActiveAttractionId(): Observable<number> {
    return this.activeAttractionSubject.asObservable();
  }

}
