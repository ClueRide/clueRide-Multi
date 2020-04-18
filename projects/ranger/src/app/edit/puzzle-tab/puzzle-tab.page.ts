import {
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import {
  Attraction,
  CategoryAttractionService,
  LocationService
} from 'cr-lib';
import {Subscription} from 'rxjs';
import {MapDataService} from '../../map/data/map-data.service';
import {ActiveAttractionService} from '../active-attraction.service';

@Component({
  selector: 'app-puzzle-tab',
  templateUrl: './puzzle-tab.page.html',
  styleUrls: ['./puzzle-tab.page.scss'],
})
export class PuzzleTabPageComponent implements OnInit, OnDestroy {

  /* Expose instance to be edited. */
  public attraction: Attraction;

  private subscription: Subscription;

  constructor(
    private activeAttractionService: ActiveAttractionService,
    private activatedRoute: ActivatedRoute,
    private categoryAttractionService: CategoryAttractionService,
    private locationService: LocationService,
    private mapDataService: MapDataService,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.subscription = this.activatedRoute.queryParams.subscribe(
      (params) => {
        const attractionId = parseInt(this.activatedRoute.snapshot.paramMap.get('id'), 10);
        this.attraction = this.categoryAttractionService.getAttraction(attractionId);
        console.log('Active Attraction', this.attraction.name);
        this.activeAttractionService.setActiveAttractionId(attractionId);

        // TODO: SVR-50 Move to the server
        if (!this.attraction.mainLink) {
          this.attraction.mainLink = {link: '', id: null};
        }
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  /**
   * Invoked when the user is ready to persist changes.
   */
  save() {
    console.log('Saving');
    this.locationService.update(this.attraction).subscribe(
      (updatedAttraction: Attraction) => {
        this.mapDataService.updateAttraction(updatedAttraction);
      }
    );
    this.router.navigate(['home']);
  }

}
