import {Injectable} from '@angular/core';
import * as L from 'leaflet';
import {Attraction} from '../../api/attraction/attraction';
import {ClickableMarker} from '../clickableMarker';
import {PoolIconService} from './pool-icon.service';
import MarkerOptions = L.MarkerOptions;

/**
 * Pool Markers are the Markers used while developing the
 * pool of available Attractions for adding to Courses.
 *
 * This service knows how to build the marker which represents
 * the given Attraction.
 */
@Injectable({
  providedIn: 'root'
})
export class PoolMarkerService {

  constructor(
    private iconService: PoolIconService
  ) {
  }

  /**
   * Builds a ClickableMarker carrying the Attraction's ID with the color and
   * image on the marker appropriate to the readiness level of the Attraction,
   * and the supplied name of the Icon.
   *
   * @param attraction containing ID and readiness level as well as Name for labeling.
   * @param iconName Font Awesome's name for the icon image to use.
   */
  public getAttractionMarker(
    attraction: Attraction,
    iconName: string
  ): ClickableMarker {
    /* Icon comes from the IconService. */
    const poolIcon: L.AwesomeMarkers.Icon = this.iconService.getPoolMarkerIcon(
      attraction.readinessLevel,
      iconName
    );
    /* Options assembled from icon and the attraction. */
    const markerOptions: MarkerOptions = {
      icon: poolIcon,
      alt: 'id:' + attraction.id,
      title: attraction.name + ' : ' + attraction.id
    };

    return new ClickableMarker(
      attraction,
      markerOptions
    );
  }

}
