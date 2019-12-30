import {
  AfterContentInit,
  Component,
  ViewChild
} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {MapDataService} from '../map/data/map-data.service';
import {MapComponent} from '../map/map';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements AfterContentInit {

  @ViewChild(MapComponent, {static: true}) map: MapComponent;

  constructor(
    private mapDataService: MapDataService,
    private titleService: Title,
  ) {

  }

  ngAfterContentInit(): void {
    this.titleService.setTitle('Home');
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
    this.map.openMap();
  }

}
