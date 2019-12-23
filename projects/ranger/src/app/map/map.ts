import {isDefined} from '@angular/compiler/src/util';
import {Component} from '@angular/core';
import {Geoposition} from '@ionic-native/geolocation';
import {NavController} from '@ionic/angular';
import {
  Attraction,
  ClickableMarker,
  HeadingComponent,
  LatLon,
  PoolMarkerService
} from 'cr-lib';
import * as L from 'leaflet';
import {Subject} from 'rxjs';
// TODO: CI-34: put this ViewLatLon component in the library
// import {LatLonComponent} from '../lat-lon/lat-lon';
// TODO: CI-32 + navigation changes
// import {LocEditPage} from '../../pages/loc-edit/loc-edit';
import {MapDataService} from './data/map-data.service';
import {MapDragService} from './drag/map-drag.service';

/**
 * Defines the Main Map upon which all Attractions are shown.
 */
@Component({
  selector: 'cr-map',
  templateUrl: 'map.html',
  styleUrls: ['map.scss']
})
export class MapComponent {

  // static latLon: LatLonComponent = {} as any;

  public map: any;

  /** Holds the current zoom for the map. */
  private zoomLevel: number;

  constructor(
    private navController: NavController,
    private heading: HeadingComponent,
    private poolMarkerService: PoolMarkerService,
    private mapDragService: MapDragService,
    private mapDataService: MapDataService,
  ) {
    this.zoomLevel = 14;

    console.log('Map Component constructing');
    this.mapDataService.sendMeNewAttractions(this.addAttraction);
  }

  /**
   * Reads the Location's readiness level to determine which tab to show.
   * @param loc Location instance carrying a readinessLevel.
   * @returns number representing an offset from Draft.
   */
  private static getTabIdForLocation(loc: Attraction) {
    switch (loc.readinessLevel) {
      case 'FEATURED':
        return 2;
      case 'ATTRACTION':
        return 1;
      default:
        return 0;
    }
  }

  /**
   * @ngDoc
   * Prepares the Leaflet map to be shown, initializing leaflet if not already initialized.
   * Source of position info should be settled prior to calling this function.
   */
  public openMap(
    positionSubject: Subject<Geoposition>,
  ) {
    console.log('Open Map');
    positionSubject.asObservable().subscribe(
      (position) => {
        console.log('Got a position for loading the map initially');
        this.openMapAtPosition(position);
      }
    );
  }

  public openMapAtPosition(position: Geoposition) {
    // TODO: LE-70
    /* Assemble Leaflet position object. */
    const leafletPosition = [
      position.coords.latitude,
      position.coords.longitude
    ];

    /* If map is already initialized, no need to re-initialize. */
    if (!this.map) {
      console.log('MapComponent Initializing');
      this.map = L.map('map');
      this.map.setView(leafletPosition, this.zoomLevel);

      /* TODO: CI-34 Rename this presentation component. */
      // MapComponent.latLon = new LatLonComponent();
      // MapComponent.latLon.addTo(MapComponent.map);
      // MapComponent.latLon.setPositionSubject(MapComponent.reportedPosition);

      /* Attach the reported position subject to the Move Start service. */
      this.mapDragService.useMap(this.map);
    }

    /* Specify the tile layer for the map and add the attribution. */
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
        '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
    }).addTo(this.map);

    /* Add a "here I am" marker. */
    this.heading.getHeadingMarker().addTo(this.map);

    /* Turn off auto-center if user drags the map. */
    this.map.on('movestart', () => {
      this.mapDragService.setAutoCenter(false);
    });

    /* Begin paying attention to position changes. */
    this.mapDataService.setWatch(this.setNewCenterForMap);
  }

  setNewCenterForMap = (geoposition: Geoposition) => {
    /* Ignore new position updates until the drag completes. */
    if (this.mapDragService.isDragInProgress()) {
      return;
    }

    // TODO: Have this guy subscribe to the MapDataService
    this.heading.updateLocation(geoposition.coords);

    /* Move map so current location is centered. */
    if (this.mapDragService.isAutoCenter() && this.map) {

      /* Suspend move event generation. */
      this.map.off('movestart');

      // TODO: LE-70 Prepare a better pattern for converting between these two representations.
      const latLon: LatLon = {
        id: 0,
        lat: geoposition.coords.latitude,
        lon: geoposition.coords.longitude,
        lng: geoposition.coords.longitude
      };
      this.map.panTo(latLon);
      console.log('Map.updatePosition: next Reported Position');

      /* Restore move event generation. */
      this.map.on('movestart',
        () => {
          this.mapDragService.setAutoCenter(false);
        }
      );
    }
  }

  public closeMap() {
    console.log('Close Map -- turn off watches');
    if (isDefined(this.map) && this.map !== null) {
      this.mapDataService.releaseWatch();
    }
    this.heading.releaseHeadingMarker();
  }

  /**
   * Given an Attraction, place it on the map using a Clickable Pool Marker.
   * Also sets up the mouse-click event to open the editing page for that attraction.
   *
   * Anonymous function so it maintains `this` when called from separate scope.
   * @param attraction to be added.
   */
  addAttraction = (
    attraction: Attraction
  ): void => {
    const iconName = attraction.locationTypeIconName;
    /* `any` -> unable to tell that ClickableMarker extends Marker? */
    const poolMarker: any = this.poolMarkerService.getAttractionMarker(
      attraction,
      iconName
    );
    console.log('Adding ' + attraction.name + ' to the map');
    poolMarker.on('click', (mouseEvent) => {
        this.openLocEditPageForMarkerClick(mouseEvent);
      });
    poolMarker.addTo(this.map);
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
    const attraction = this.mapDataService.getAttractionById(crMarker.attractionId);

    /* TODO: Routing with parameters (CI-32). */
    // this.navController.push(
    //   LocEditPage,
    //   {
    //     location: attraction,
    //     tabId: MapComponent.getTabIdForLocation(attraction)
    //   }
    // );
  }

}
