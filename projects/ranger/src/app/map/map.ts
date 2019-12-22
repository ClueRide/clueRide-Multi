import {isDefined} from '@angular/compiler/src/util';
import {Component} from '@angular/core';
import {Geoposition} from '@ionic-native/geolocation';
import {NavController} from '@ionic/angular';
import {GeoLocService, HeadingComponent, LatLon, Location} from 'cr-lib';
import * as L from 'leaflet';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
// TODO: CI-34: put this in the library
// import {LatLonComponent} from '../lat-lon/lat-lon';
// TODO: CI-35 Marker functionality
// import {CRMarker} from '../markers/crMarker';
// TODO: CI-35 Marker functionality
// import {MarkersComponent} from '../markers/markers';
// TODO: CI-32 + navigation changes
// import {LocEditPage} from '../../pages/loc-edit/loc-edit';
import {MapDataService} from './data/map-data.service';
import {MapDragService} from './drag/map-drag.service';

interface LocationMap {
  [index: number]: Location;
}

/**
 * Defines the Main Map upon which all Attractions are shown.
 */
@Component({
  selector: 'cr-map',
  templateUrl: 'map.html',
  styleUrls: ['map.scss']
})
export class MapComponent {

  constructor(
    public navController: NavController,
    public geoLoc: GeoLocService,
    private heading: HeadingComponent,
    // TODO: CI-35 Marker functionality
    // private markers: MarkersComponent,
    private mapDragService: MapDragService,
    private mapDataService: MapDataService,
  ) {
    this.zoomLevel = 14;

    console.log('Registering for New Locations');
    this.mapDataService.sendMeNewLocations(this.addLocation);
  }


  /* TODO: Move to a service. */
  public static map: any;
  static locationMap: LocationMap = {};
  private static tethered = false;
  // static latLon: LatLonComponent = {} as any;
  private static reportedPosition: BehaviorSubject<Geoposition> = new BehaviorSubject({
    coords: {
      latitude: 33.75,
      longitude: -84.75,
      accuracy: 0.0,
      altitude: null,
      altitudeAccuracy: null,
      heading: null,
      speed: null
    },
    timestamp: null
  });

  /** Holds the current zoom for the map. */
  zoomLevel: number;
  showLatLon = true;
  showCrosshairs = false;
  public publiclyReportedPosition: BehaviorSubject<Geoposition> = MapComponent.reportedPosition;

  /**
   * Reads the Location's readiness level to determine which tab to show.
   * @param loc Location instance carrying a readinessLevel.
   * @returns number representing an offset from Draft.
   */
  private static getTabIdForLocation(loc: Location) {
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
    /* Assemble Leaflet position object. (LE-70) */
    const leafletPosition = [
      position.coords.latitude,
      position.coords.longitude
    ];

    /* If map is already initialized, no need to re-initialize. */
    if (!MapComponent.map) {
      console.log('MapComponent Initializing');
      MapComponent.locationMap = {};
      MapComponent.map = L.map('map');
      MapComponent.map.setView(leafletPosition, this.zoomLevel);

      /* TODO: CI-34 Rename this presentation component. */
      // MapComponent.latLon = new LatLonComponent();
      // MapComponent.latLon.addTo(MapComponent.map);
      // MapComponent.latLon.setPositionSubject(MapComponent.reportedPosition);

      /* Attach the reported position subject to the Move Start service. */
      this.mapDragService.useMap(MapComponent.map, MapComponent.reportedPosition);
    }

    /* Specify the tile layer for the map and add the attribution. */
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
        '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
    }).addTo(MapComponent.map);

    /* Add a "here I am" marker. */
    this.heading.getHeadingMarker().addTo(MapComponent.map);

    /* Turn off auto-center if user drags the map. */
    MapComponent.map.on('movestart', () => {
      this.mapDragService.setAutoCenter(false);
    });

    /* Begin paying attention to position changes. */
    this.setWatch();
  }

  public setWatch(): Observable<Geoposition> {
    // TODO: Move this watch into the Data Service; we just turn on/off the watch
    const positionObservable = this.geoLoc.getPositionWatch();
    positionObservable.subscribe(
      (position) => {
        if (!this.mapDragService.isDragInProgress()) {
          this.setNewCenterForMap(position);
        }
      }
    );
    return positionObservable;
  }

  setNewCenterForMap(position: Geoposition) {
    this.heading.updateLocation(position.coords);

    /* Move map so current location is centered. */
    if (this.mapDragService.isAutoCenter() && MapComponent.map) {

      /* Suspend move event generation. */
      MapComponent.map.off('movestart');

      // TODO: LE-70 Prepare a better pattern for converting between these two representations.
      const latLon: LatLon = {
        id: 0,
        lat: position.coords.latitude,
        lon: position.coords.longitude,
        lng: position.coords.longitude
      };
      MapComponent.map.panTo(latLon);
      console.log('Map.updatePosition: next Reported Position');
      MapComponent.reportedPosition.next(position);

      /* Restore move event generation. */
      MapComponent.map.on('movestart',
        () => {
          this.mapDragService.setAutoCenter(false);
        }
      );
    }
  }
  public closeMap() {
    console.log('Close Map -- turn off watches');
    if (isDefined(MapComponent.map) && MapComponent.map !== null) {
      this.geoLoc.clearWatch();
    }
    this.heading.releaseHeadingMarker();
  }

  /**
   * Given a Location, place it on the map.
   * @param location to be added.
   */
  private addLocation = (
    location: Location
  ): void => {
    const iconName = location.locationTypeIconName;
    MapComponent.locationMap[location.id] = location;
    // TODO: CI-35 Marker functionality
    // const locationMarker = this.markers.getLocationMarker(location, iconName)
    //   .on('click', (mouseEvent) => {
    //     this.openLocEditPageForMarkerClick(mouseEvent);
    //   });
    // locationMarker.addTo(MapComponent.map);
  }

  /**
   * Given the click event for a location's marker, which contains the location ID,
   * open the Location Edit page with that Location.
   * @param mouseEvent carrying location of the click.
   */
  private openLocEditPageForMarkerClick = (
    mouseEvent
  ): void => {
    console.log('Marker Click for Loc ID: ' + mouseEvent.target.locationId);
    // TODO: CI-35 Marker functionality
    // const crMarker: CRMarker = mouseEvent.target;
    /* TODO: Routing with parameters (CI-32). */
    // const nav = this.appCtrl.getRootNavById('n4') as NavController;
    // TODO: CI-35 Marker functionality
    // const loc = MapComponent.locationMap[crMarker.locationId];

    /* TODO: Routing with parameters (CI-32). */
    // this.navController.push(
    //   LocEditPage,
    //   {
    //     location: loc,
    //     tabId: MapComponent.getTabIdForLocation(loc)
    //   }
    // );
  }

  settingsFabAction(event) {
    event.srcEvent.stopPropagation();
    console.log('Settings Toggle');
  }

  settingsToggleCrosshairs(event) {
    event.srcEvent.stopPropagation();
    this.showCrosshairs = !this.showCrosshairs;
    console.log('Crosshairs: ' + this.showCrosshairs);
  }

  settingsToggleLatLon(event) {
    event.srcEvent.stopPropagation();
    this.showLatLon = !this.showLatLon;
    // TODO: CI-34 bring latLon replacement into here
    // MapComponent.latLon.enableDisplay(this.showLatLon);
    console.log('Lat/Lon: ' + this.showLatLon);
  }

  settingsToggleAutoCenter(event) {
    event.srcEvent.stopPropagation();
    this.mapDragService.setAutoCenter(!this.mapDragService.isAutoCenter());
  }

  /* Respond to request to repaint the locations. */
  refreshMap(event) {
    event.srcEvent.stopPropagation();
    this.openMapAtPosition(this.mapDataService.getCurrentPosition());
    /* Clear existing list of locations. */
    /* Trigger sending us another set of locations. */
    this.mapDataService.resendAllLocations();
  }

  /* Won't be appropriate for Loc Edit. */
  settingsToggleTether() {
    MapComponent.tethered = !MapComponent.tethered;
  }

}
