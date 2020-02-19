import {
  Component,
  OnInit
} from '@angular/core';
import {FilterService} from '../../filter/filter.service';
import {MapDataService} from '../data/map-data.service';
import {MapDragService} from '../drag/map-drag.service';
import {MapStateService} from '../state/map-state.service';

@Component({
  selector: 'app-map-action',
  templateUrl: './map-action.component.html',
  styleUrls: ['./map-action.component.scss'],
})
export class MapActionComponent implements OnInit {

  private attractionsFilterFlag: boolean;

  constructor(
    private mapDataService: MapDataService,
    private mapStateService: MapStateService,
    private mapDragService: MapDragService,
    private filterService: FilterService,
  ) {
    this.attractionsFilterFlag = this.filterService.isFilterShown();
  }

  ngOnInit() {}

  settingsFabAction(event: Event) {
    console.log('Settings Toggle');
  }

  /* TODO: Not currently defined as an action on the map. */
  settingsToggleCrosshairs(event) {
    event.srcEvent.stopPropagation();
    console.log(
      'Crosshairs: ' + this.mapStateService.settingsToggleCrosshairs()
    );
  }

  settingsToggleLatLon(event: Event) {
    // this.showLatLon = !this.showLatLon;
    // TODO: CI-34 bring latLon replacement into here
    // MapComponent.latLon.enableDisplay(this.showLatLon);
    // console.log('Lat/Lon: ' + this.showLatLon);
    console.log('Lat/Lon: ');
  }

  /**
   * Flips the state of Auto Center.
   *
   * Generally, when using the map, it is dragged into position and
   * we don't want the position to change until we've moved a significant
   * distance. So, the state is usually false once we've started dragging
   * the map. Once we've travelled to another location, it's good to let
   * the map show us where we are currently. That's usually when this button
   * will be hit -- to show us our current location.
   *
   * @param event is ignored at this time.
   */
  settingsToggleAutoCenter(event: Event) {
    this.mapDragService.setAutoCenter(!this.mapDragService.isAutoCenter());
  }

  /* Respond to request to repaint the locations. */
  refreshMap(event: Event) {
    // this.openMapAtPosition(this.mapDataService.getCurrentPosition());
    /* Clear existing list of locations. */
    /* Trigger sending us another set of locations. */
    this.mapDataService.resendAllLocations();
  }

  toggleFilter(event: Event) {
    this.attractionsFilterFlag = this.filterService.toggleFilterShown();
    console.log('Filter Attractions', this.attractionsFilterFlag);
    this.mapDataService.changeAttractionFilter(this.attractionsFilterFlag);
  }

}
