import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import * as L from 'leaflet';
import {Attraction} from '../attraction';
import {LatLonService} from '../../../domain/lat-lon/lat-lon.service';

@Injectable({
  providedIn: 'root'
})
export class BoundsService {

  readonly boundsChangeSubject: Subject<L.LatLngBounds>;

  constructor(
    private latLonService: LatLonService,
  ) {
      this.boundsChangeSubject = new Subject<L.LatLngBounds>();
  }

  /**
   * Will trigger a bounds change based on the array of Attractions passed.
   * @param attractions array of the attractions whose boundary we want to find
   * and send out to listeners.
   */
  public setNewBounds(attractions: Attraction[]): void {
    let bounds: L.LatLngBounds = null;

    /* No change of bounds if we don't have at least two attractions. */
    if (!attractions || attractions.length < 2) {
      return;
    }

    attractions.forEach(
      (attraction: Attraction) => {
        let latLng = this.latLonService.toLatLng(attraction.latLon);
        if (bounds === null) {
          bounds = L.latLngBounds([latLng, latLng]);
        } else {
          bounds.extend(latLng);
        }
      });

    this.boundsChangeSubject.next(bounds);
  }

  /**
   * Retrieves the subject which clients can subscribe to so they are notified when
   * the map bounds should accommodate a new set of attractions to be within the visible frame.
   */
  public getBoundsChangeSubject(): Subject<L.LatLngBounds> {
    return this.boundsChangeSubject;
  }

}
