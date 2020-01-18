import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import * as L from 'leaflet';
import 'leaflet.awesome-markers/dist/leaflet.awesome-markers';
import {Attraction} from '../../api/attraction/attraction';

/**
 * This list of valid marker colors is taken from the leaflet.awesome-markers github README:
 * https://github.com/lvoogdt/Leaflet.awesome-markers
 */
export type MarkerColor =
  'red'
  | 'darkred'
  | 'orange'
  | 'green'
  | 'darkgreen'
  | 'blue'
  | 'purple'
  | 'darkpurple'
  | 'cadetblue';

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
        icon: 'play',
        markerColor: 'green',
        prefix: 'ion-md'
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
        markerColor: 'darkblue',
        prefix: 'fa'
      }
    );

    this.monumentIcon = GameMarkerService.createIcon(
      'monument',
      'fa',
      'darkpurple'
    );

  }

  static createIcon(
    iconName: string = 'flag',
    prefix: 'ion' | 'fa' = 'fa',
    markerColor: MarkerColor = 'blue'
  ): L.AwesomeMarkers.Icon {
    return L.AwesomeMarkers.icon(
      {
        icon: iconName,
        prefix,
        markerColor
      }
    );
  }

  /**
   * For the given marker, set the OnClick response to push the Location Page
   * for the Attraction ID carried by the marker.
   *
   * Exception is thrown if the marker doesn't carry the `id` property.
   *
   * @param marker Leaflet marker with additional attribute for the attraction ID.
   */
  static setOnClickToLocationPage(marker: L.marker): void {
    if (!marker.options.id) {
      console.error('Marker without Attraction ID');
      throw {
        error: 'setOnClickToLocationPage: marker doesn\'t have an attraction ID'
      };
    }
    marker.on('click', GameMarkerService.onAttractionMarker);
  }

  /** Response to clicks on the attraction's marker: show the attraction's page. */
  private static onAttractionMarker(e) {
    const details = e.target.options;
    details.router.navigate(['attraction', details.id]);
  }

  generateAttractionMarker(
    attraction: Attraction
  ): L.marker {
    /* Adding the right color and icon goes here. */
    const marker: L.marker = L.marker(
      L.latLng(attraction.latLon),
      {
        id: attraction.id,
        title: attraction.name,
        router: this.router,
        icon: this.selectMarkerIcon(attraction),
      }
    );

    /* What to do when user clicks on the attraction. */
    GameMarkerService.setOnClickToLocationPage(marker);

    return marker;
  }

  selectMarkerIcon(attraction: Attraction): L.AwesomeMarker.Icon {
    if (attraction.isLast) { return this.nextAttractionIcon; }
    if (attraction.isCurrent) { return this.currentAttractionIcon; }
    return this.defaultAttractionIcon;
  }

}
