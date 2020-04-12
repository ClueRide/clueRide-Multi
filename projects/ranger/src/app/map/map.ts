import {isDefined} from '@angular/compiler/src/util';
import {Component} from '@angular/core';
import {Geoposition} from '@ionic-native/geolocation';
import {
  Attraction,
  AttractionLayerService,
  HeadingComponent,
  LatLonService,
  PoolMarkerService
} from 'cr-lib';
import * as L from 'leaflet';
import {Subscription} from 'rxjs';
import {MapDataService} from './data/map-data.service';
import {MapDragService} from './drag/map-drag.service';
import {MapPositionService} from './position/map-position.service';
import {MapCenterDisplayComponent} from '../../../../cr-lib/src/lib/map-center/map-center-display.component';

/** Defines reasonable Zoom Level for initially opening the map. */
const DEFAULT_ZOOM_LEVEL = 14;

/**
 * Defines the Main Map upon which all Attractions are shown.
 */
@Component({
  selector: 'cr-map',
  templateUrl: 'map.html',
  styleUrls: ['map.scss']
})
export class MapComponent {

  // TODO: CI-34: put this ViewLatLon component in the library
  // static latLon: LatLonComponent = {} as any;

  public map: L.Map;

  /** Holds subscription resources so we can release them when map is closed. */
  private subscription: Subscription;

  /** Holds Leaflet Layer for all Categories of Markers. */
  private attractionLayerGroup: L.LayerGroup;
  private layerIdPerAttraction: { [index: number]: number } = [];

  /** Displays the coordinates of the current center of the map. */
  private static mapCenterDisplay: MapCenterDisplayComponent;

  constructor(
    private attractionLayerService: AttractionLayerService,
    private heading: HeadingComponent,
    private latLonService: LatLonService,
    private mapDragService: MapDragService,
    private mapDataService: MapDataService,
    private mapPositionService: MapPositionService,
    private poolMarkerService: PoolMarkerService,
  ) {
    console.log('Map Component: constructor()');
  }

  /**
   * Prepares the Leaflet map to be shown, initializing leaflet if not already initialized.
   * Source of position info should be settled prior to calling this function.
   */
  public openMapAtPosition(
    position: Geoposition
  ) {

    console.log('Map Component: openMapAtPosition()');
    /* If map is already initialized, no need to re-initialize. */
    if (!this.map) {
      console.log('MapComponent Initializing');
      this.map = L.map('map');
      this.map.setView(
        this.latLonService.toLatLng(position),
        DEFAULT_ZOOM_LEVEL
      );

      /* Setup the Map Center Display. */
      MapComponent.mapCenterDisplay = new MapCenterDisplayComponent();
      MapComponent.mapCenterDisplay.addTo(this.map);
      MapComponent.mapCenterDisplay.setMapCenterObservable(
        this.mapPositionService.getCurrentPositionSubject()
      );

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

    /* Register to be updated with the Category Layers. */
    this.attractionLayerGroup = L.layerGroup().addTo(this.map);
    this.mapDataService.registerAttractionLayerGroup(this.attractionLayerGroup);
  }

  setNewCenterForMap = (
    geoPosition: Geoposition
  ) => {
    /* Ignore new position updates until the drag completes. */
    if (this.mapDragService.isDragInProgress()) {
      return;
    }

    // TODO CI-149: Have this guy subscribe to the MapDataService or other appropriate source.
    this.heading.updateLocation(geoPosition.coords);

    /* Move map so current location is centered. */
    if (this.mapDragService.isAutoCenter() && this.map) {

      /* Suspend move event generation. */
      this.map.off('movestart');

      this.map.panTo(this.latLonService.toLatLng(geoPosition));
      // console.log('Map.updatePosition: next Reported Position');

      /* Restore move event generation. */
      this.map.on('movestart',
        () => {
          this.mapDragService.setAutoCenter(false);
        }
      );
    }
  }

  ngOnDestroy(): void {
    console.log('Close Map -- turn off watches');
    // this.subscription.unsubscribe();
    if (isDefined(this.map) && this.map !== null) {
      this.mapPositionService.releaseWatch();
    }
    this.heading.releaseHeadingMarker();
  }

  /**
   * Given an Attraction, place it on the map using a Clickable Pool Marker.
   * Pool Service sets up the mouse-click event to open the editing page for that attraction.
   *
   * Anonymous function so it maintains `this` when called from separate scope.
   * @param attraction to be added.
   */
  addAttraction = (
    attraction: Attraction
  ): void => {
    /* `any` -> unable to tell that ClickableMarker extends Marker? */
    const poolMarker: any = this.poolMarkerService.getAttractionMarker(
      attraction
    );

    /* TODO: Place within category-based layer/group (LE-76). */
    poolMarker.addTo(this.attractionLayerGroup);
    this.layerIdPerAttraction[attraction.id] = this.attractionLayerGroup.getLayerId(poolMarker);
  }

  /**
   * Replace an existing Attraction with this new version of the same Attraction.
   *
   * @param attraction with updated information.
   */
  updateAttraction = (
    attraction: Attraction
  ): void => {
    console.log('MapComponent: Updating Attraction', attraction.id);

    /* TODO LE-76. */
    /* Remove existing Attraction from map. */
    const layer = this.attractionLayerGroup;
    // @ts-ignore
    if (layer.hasLayer(this.layerIdPerAttraction[attraction.id])) {
      layer.removeLayer(this.layerIdPerAttraction[attraction.id]);
    }

    /* Now we can place the updated instance of the attraction. */
    this.addAttraction(attraction);
  }

  /**
   * Passed to Map Data Service whenever it determines that the map needs to be cleared in preparation for a new
   * set of Attractions. This will eventually serve as the main Attraction layer for a focused set of Attractions.
   *
   * This is separate from the Category Group Layers discussed as part of ticket LE-76.
   */
  clearMap = (): void => {
    // TODO: perhaps touched by LE-76
    this.attractionLayerGroup.clearLayers();
  }

}
