import {Component, Input} from '@angular/core';
import {Geoposition} from '@ionic-native/geolocation';
import {NavController} from '@ionic/angular';
import {LatLon, LocationService} from 'cr-lib';
import {BehaviorSubject} from 'rxjs';
// TODO: CI-32 Edit Page for adding a new location
// import {LocEditPage} from '../../pages/loc-edit/loc-edit';

/**
 * Provides a button that upon clicking will query the map's current
 * center and then propose a new Location for that pair of coordinates.
 */
@Component({
  selector: 'add-loc-button',
  templateUrl: 'add-loc-button.html',
  styleUrls: ['add-loc-button.scss']
})
export class AddLocButtonComponent {

  @Input() mapCenter: BehaviorSubject<Geoposition>;

  constructor(
    public locationService: LocationService,
    private navCtrl: NavController,
  ) {
    console.log('Hello AddLocButtonComponent Component');
  }

  addLocationAction(event) {
    event.srcEvent.stopPropagation();
    const newGeoposition: Geoposition = this.mapCenter.getValue();
    alert(JSON.stringify(newGeoposition.coords));
    const newLatLon = new LatLon();
    newLatLon.lat = newGeoposition.coords.latitude;
    newLatLon.lon = newGeoposition.coords.longitude;
    newLatLon.lng = newGeoposition.coords.longitude;

    this.locationService.proposeLocation(newLatLon)
      .subscribe(location => {
        // TODO: CI-32
        // this.navCtrl.push(LocEditPage, {
        //   location,
        //   tabId: 0    // New Locations won't have any data; start on Tab 0
        // });
      });
  }

}
