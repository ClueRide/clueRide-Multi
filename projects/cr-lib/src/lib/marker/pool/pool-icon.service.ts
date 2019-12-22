import {Injectable} from '@angular/core';

import * as L from 'leaflet';

/**
 * Service for building the Icon for a given Pool Marker.
 *
 * Readiness level and the icon name are given; the icon name is
 * only used for certain Readiness levels.
 */
@Injectable({
  providedIn: 'root'
})
export class PoolIconService {

  /* Cache for these stable icons. */
  private readonly featuredIcon: L.AwesomeMarkers.Icon;
  private readonly issueIcon: L.AwesomeMarkers.Icon;
  private readonly unknownIcon: L.AwesomeMarkers.Icon;

  constructor(
  ) {
    this.featuredIcon = PoolIconService.getFontAwesomeIcon(
      'exclamation',
      'purple'
    );
    this.issueIcon = PoolIconService.getFontAwesomeIcon(
      'exclamation',
      'red'
    );
    this.unknownIcon = PoolIconService.getFontAwesomeIcon(
      'question',
      'darkred'
    );
  }

  /**
   * Prepares a Font Awesome Marker of the requested icon and color.
   *
   * Static because the imported Leaflet code is tougher to inject.
   */
  static getFontAwesomeIcon(
    iconName: string,
    markerColor: any
  ): L.AwesomeMarkers.Icon {
    return L.AwesomeMarkers.icon({
      icon: iconName,
      markerColor,
      prefix: 'fa'
    });
  }

  /**
   * Given the readiness level and the icon name, select or build an
   * appropriate Pool Icon to be used with a Pool Marker.
   *
   * @param readinessLevel string representation of the Readiness Level
   * for a given Location/Attraction.
   * @param iconName the string name of the Awesome Markers icon.
   */
  public getPoolMarkerIcon(
    readinessLevel: string,
    iconName: string
  ): L.AwesomeMarkers.Icon {
    switch (readinessLevel.toUpperCase()) {
      case 'ISSUE':
        return this.issueIcon;
      case 'DRAFT':
        return PoolIconService.getFontAwesomeIcon(iconName, 'orange');
      case 'PLACE':
        return PoolIconService.getFontAwesomeIcon(iconName, 'green');
      case 'ATTRACTION':
        return PoolIconService.getFontAwesomeIcon(iconName, 'blue');
      case 'FEATURED':
        return this.featuredIcon;
      case 'NODE':
      default:
        return this.unknownIcon;
    }
  }

}
