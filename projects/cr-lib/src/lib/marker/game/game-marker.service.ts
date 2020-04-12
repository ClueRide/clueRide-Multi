import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import * as L from 'leaflet';
import 'leaflet.awesome-markers';
import {Attraction} from '../../api/attraction/attraction';
import {ClickableMarker} from '../clickableMarker';
import MarkerOptions = L.MarkerOptions;

/**
 * Creates the markers used in Clue Ride Player module.
 *
 * This is based on the leaflet.AwesomeMarkers and supports
 * both ionicons and Font Awesome Icons. For these to show up,
 * the CSS must be included in the application (index.html) and
 * for the markers themselves, there are a set of image resources
 * that need to be copied from the distribution into the application.
 *
 * There is also a bit of CSS that needs to be named as SASS/SCSS
 * as described in the README.md for the TODO
 */

@Injectable({
  providedIn: 'root'
})
export class GameMarkerService {

  private readonly currentAttractionIcon: L.AwesomeMarkers.Icon;
  private readonly defaultAttractionIcon: L.AwesomeMarkers.Icon;
  private readonly nextAttractionIcon: L.AwesomeMarkers.Icon;
  private readonly monumentIcon: L.AwesomeMarkers.Icon;

  constructor(
    private router: Router,
  ) {
    this.currentAttractionIcon = L.AwesomeMarkers.icon(
      {
        icon: 'map-pin',
        markerColor: 'green',
        prefix: 'fa'
      }
    );

    this.nextAttractionIcon = L.AwesomeMarkers.icon(
      {
        icon: 'lock',
        markerColor: 'red',
        prefix: 'fa'
      }
    );

    this.defaultAttractionIcon = L.AwesomeMarkers.icon(
      {
        icon: 'lock-open',
        markerColor: 'cadetblue',
        prefix: 'fa'
      }
    );

    this.monumentIcon = L.AwesomeMarkers.icon(
      {
        icon: 'monument',
        prefix: 'fa',
        markerColor: 'darkpurple'
      }
    );

  }

  /** Response to clicks on the attraction's marker: show the attraction's page. */
  private static onAttractionMarker(e) {
    const details = e.target.options;
    details.router.navigate(['attraction', details.id]);
  }

  /**
   * Builds a ClickableMarker carrying the Attraction's ID with the color and image
   * on the marker set to the position within the Course.
   *
   * @param attraction containing ID and its state along the Course.
   */
  public generateAttractionMarker(
    attraction: Attraction
  ): ClickableMarker {

    const gameIcon = this.selectMarkerIcon(attraction);

    const markerOptions: MarkerOptions = {
      icon: gameIcon,
      alt: 'id:' + attraction.id,
      title: attraction.name,
    };

    const marker: ClickableMarker = new ClickableMarker(
      attraction,
      markerOptions
    );

    /* What to do when user clicks on the attraction. */
    marker.on('click', (mouseEvent) => {
      this.openLocationPageForMarkerClick(mouseEvent);
    });

    return marker;
  }

  private openLocationPageForMarkerClick(
    mouseEvent
  ): void {
    const crMarker: ClickableMarker = mouseEvent.target;
    this.router.navigate(
      ['attraction', crMarker.attractionId]
    ).then(() => console.log('Successful launch of Attraction Page')
    ).catch( (error) => console.log('Failed to launch Attraction Page')
    );
  }

  selectMarkerIcon(attraction: Attraction): L.AwesomeMarkers.Icon {
    if (attraction.isLast) { return this.nextAttractionIcon; }
    if (attraction.isCurrent) { return this.currentAttractionIcon; }
    return this.defaultAttractionIcon;
  }

}
