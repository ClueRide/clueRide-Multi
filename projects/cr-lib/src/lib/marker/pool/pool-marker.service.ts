import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import * as L from 'leaflet';
import {Attraction} from '../../api/attraction/attraction';
import {CategoryAttractionService} from '../../api/attraction/category/category-attraction.service';
import {ClickableMarker} from '../clickableMarker';
import {PoolIconService} from './pool-icon.service';
import MarkerOptions = L.MarkerOptions;

/**
 * TODO: CI-160 - display-only markers from the pool (categories).
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
    private iconService: PoolIconService,
    private categoryAttractionService: CategoryAttractionService,
    private router: Router
  ) {
  }

  /**
   * Reads the Location's readiness level to determine which tab to show.
   * @param attraction instance carrying a readinessLevel.
   * @returns number representing an offset from Draft.
   */
  private static getTabIdForLocation(attraction: Attraction): string {
    switch (attraction.readinessLevel) {
      case 'ATTRACTION':
        return 'puzzle';
      case 'PLACE':
        return 'place';
      default:
        return 'draft';
    }
  }

  /**
   * Builds a ClickableMarker carrying the Attraction's ID with the color and
   * image on the marker appropriate to the readiness level of the Attraction,
   * and the attraction-supplied name of the Icon.
   *
   * @param attraction containing ID and readiness level as well as Name for labeling.
   */
  public getAttractionMarker(
    attraction: Attraction
  ): ClickableMarker {
    /* Icon comes from the IconService. */
    const poolIcon: L.AwesomeMarkers.Icon = this.iconService.getPoolMarkerIcon(
      attraction.readinessLevel,
      attraction.locationType.icon
    );

    /* Options assembled from icon and the attraction. */
    const markerOptions: MarkerOptions = {
      icon: poolIcon,
      alt: 'id:' + attraction.id,
      title: attraction.name + ' : ' + attraction.id
    };

    const poolMarker: any = new ClickableMarker(
      attraction,
      markerOptions
    );

    // TODO: CI-160 - click response for display-only Attractions
    poolMarker.on('click', (mouseEvent) => {
      this.openLocEditPageForMarkerClick(mouseEvent);
    });

    return poolMarker;
  }

  /**
   * Given the click event for a location's marker, which contains the location ID,
   * open the Location Edit page with that Location.
   * @param mouseEvent carrying location of the click.
   */
  private openLocEditPageForMarkerClick(
    mouseEvent
  ): void {
    const crMarker: ClickableMarker = mouseEvent.target;
    console.log('Marker Click for attraction ID: ' + crMarker.attractionId);
    const selectedAttraction = this.categoryAttractionService.getAttraction(crMarker.attractionId);

    /* Note the subtle coupling here between modules: the client app must provide a route for `edit`. */
    this.router.navigate(
      ['edit', selectedAttraction.id, PoolMarkerService.getTabIdForLocation(selectedAttraction)]
    ).then(() => {
      console.log('Successful launch of edit page');
    }).catch( (error) => {
      console.log('Failed to launch edit page: ', error);
    });
  }

}
