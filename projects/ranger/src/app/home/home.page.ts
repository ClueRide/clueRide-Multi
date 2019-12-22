import {AfterContentInit, Component, ViewChild} from '@angular/core';
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

  ionViewWillEnter() {
    console.log('Map/Home Page: Will Enter');
    this.map.openMap(this.mapDataService.getCurrentPositionSubject());
  }

  /**
   * Life-Cycle events are tracked at the View level.
   */
  ionViewWillLeave() {
    console.log('Map/Home Page: Will Leave');
    this.map.closeMap();
  }

}
