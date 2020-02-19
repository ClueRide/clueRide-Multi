import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  private filterShown: boolean;

  constructor() { }

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

}
