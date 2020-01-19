import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {Geoposition} from '@ionic-native/geolocation';
import {
  LatLonService,
  LocationService
} from 'cr-lib';
import {MapDataService} from '../data/map-data.service';

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

  constructor(
    private latLonService: LatLonService,
    private locationService: LocationService,
    private mapDataService: MapDataService,
    private router: Router,
  ) {
    console.log('Hello AddLocButtonComponent Component');
  }

  addLocationAction(event: Event) {
    const newGeoposition: Geoposition = this.mapDataService.getReportedPosition();
    alert(JSON.stringify(newGeoposition.coords));

    // TODO: CA-256 Turn this into AttractionService
    this.locationService.proposeLocation(
      this.latLonService.toLatLon(newGeoposition)
    ).subscribe(newAttraction => {

        /* TODO: SVR-79: take care of this server-side. */
        newAttraction.readinessLevel = 'DRAFT';

        /* Add to the client-side service. */
        this.mapDataService.assembleAndAddAttraction(newAttraction);

        /* Navigate to the Attraction Edit pages. */
        this.router.navigate(
          ['edit', newAttraction.id, 'draft']
        ).then(() => {
          console.log('Successful launch of edit page');
        }).catch( (error) => {
          console.log('Failed to launch edit page: ', error);
        });
      });
  }

}
