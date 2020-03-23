import {
  Component,
  ViewChild
} from '@angular/core';
import {MapComponent} from '../map/map';
import {MapPositionService} from '../map/position/map-position.service';
import {Geoposition} from '@ionic-native/geolocation';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  @ViewChild(MapComponent, {static: true}) map: MapComponent;

  constructor(
    private mapPositionService: MapPositionService
  ) {
  }

  /**
   * Tell the Map Component that we're ready to plop down an implementation of the Map.
   *
   * Dimensions of the Map content aren't known until we're about to
   * enter the Page's view; the component itself can't tell.
   *
   * Components do implement the onInit and onDestroy, so we don't need notification
   * for shutting down the page. No need for `ionViewWillLeave()`.
   */
  ionViewWillEnter() {
    console.log('Map/Home Page: Will Enter');
    /* Tell MapPositionService to begin watching device position. */
    this.mapPositionService.findOurPosition();

    /* Once a position is determined, we can use it to open the map. */
    this.mapPositionService.getCurrentPositionSubject().subscribe(
      (geoPosition: Geoposition) => this.map.openMapAtPosition(geoPosition)
    );
  }

}
