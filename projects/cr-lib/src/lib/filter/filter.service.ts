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
    this.filterSubject = new ReplaySubject<Filter>();
    this.currentFilter = {
      categoriesToIncludeById: [],
      outingToInclude: null,
      isEmpty: true
    };
  }

  /**
   * Returns current state of whether the filter is turned on or not.
   */
  public isFilterShown(): boolean {
    return this.filterShown;
  }

  /**
   * Toggles the current state of the filter without changing the particular filter itself.
   */
  public toggleFilterShown(): boolean {
    this.filterShown = !this.filterShown;
    return  this.filterShown;
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
