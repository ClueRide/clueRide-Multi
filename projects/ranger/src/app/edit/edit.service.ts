import {Injectable} from '@angular/core';
import {
  Attraction,
  LocationService
} from 'cr-lib';
import {MapDataService} from '../map/data/map-data.service';
import {Router} from '@angular/router';

/**
 * Shared functionality between the tabs of the Edit pages.
 */
@Injectable({
  providedIn: 'root'
})
export class EditService {

  constructor(
    private locationService: LocationService,
    private mapDataService: MapDataService,
    private router: Router,
  ) { }

  /**
   * Invoked when the user is ready to persist changes.
   */
  save(attraction: Attraction) {
    console.log('Saving');
    this.locationService.update(attraction).subscribe(
      (updatedAttraction: Attraction) => {
        this.mapDataService.updateAttraction(updatedAttraction);
        this.router.navigate(['home']);
      }
    );
  }

  delete(attraction: Attraction) {
    console.log('Deleting');
    this.locationService.delete(attraction.id).subscribe(
      (location) => {
        console.log('Location is deleted:', location);
        this.mapDataService.deleteAttraction(attraction);
        this.router.navigate(['home']);
      }
    );
  }


}
