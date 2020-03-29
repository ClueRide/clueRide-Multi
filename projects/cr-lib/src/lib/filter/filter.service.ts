import {Injectable} from '@angular/core';
import {Filter} from './filter';
import {
  Observable,
  ReplaySubject,
  Subject
} from 'rxjs';

/**
 * Associated with the on/off button style of filter used as a POC;
 * that button has been rendered obsolete by the FilterPage.
 *
 * Also keeps track of the current value for the Filter.
 */
@Injectable({
  providedIn: 'root'
})
export class FilterService {
  private filterShown: boolean;
  private currentFilter: Filter;

  /* Publish changes to the Filter on this Subject. */
  private readonly filterSubject: Subject<Filter>;

  constructor() {
    console.log('FilterService: constructor()');
    this.filterSubject = new ReplaySubject<Filter>(1);

    this.currentFilter = {
      categoriesToIncludeById: [],
      outingToInclude: null,
      isEmpty: true
    };
  }

  public changeFilter(filter: Filter) {
    this.currentFilter = filter;
    this.filterSubject.next(filter);
  }

  public getCurrentFilter(): Filter {
    return this.currentFilter;
  }

  /**
   * Listen for filter changes by subscribing to this Observable.
   */
  public getFilterObservable(): Observable<Filter> {
    return this.filterSubject.asObservable();
  }

}
