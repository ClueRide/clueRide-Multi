import {
  Component,
  OnInit
} from '@angular/core';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import {
  Attraction,
  LocationService,
  LocTypeService
} from 'cr-lib';
import {Subscription} from 'rxjs';
import {MapDataService} from '../../map/data/map-data.service';
import {ActiveAttractionService} from '../active-attraction.service';

/**
 * Page/Tab for editing draft-level of Attractions.
 *
 * Place/Image and Attraction/Puzzle levels are sibling tabs.
 *
 * NOTE: when creating a "new" attraction, an empty record with
 * an appropriate ID and LatLon pair has already been created in
 * the database, so from the backend/DB perspective, the form client
 * is always editing an existing set of records with established IDs.
 */
@Component({
  selector: 'app-draft-tab',
  templateUrl: './draft-tab.page.html',
  styleUrls: ['./draft-tab.page.scss'],
})
export class DraftTabPage implements OnInit {

  /* Exposed for the view. */
  public attraction: Attraction;
  public locTypes = [];
  public attractionId: number;

  private subscription: Subscription;

  constructor(
    private activeAttractionService: ActiveAttractionService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private mapDataService: MapDataService,
    private locationService: LocationService,
    private locationTypeService: LocTypeService,
  ) {
  }

  ngOnInit() {
    this.subscription = this.activatedRoute.queryParams.subscribe(
      (params) => {
        this.attractionId = parseInt(this.activatedRoute.snapshot.paramMap.get('id'), 10);
        this.attraction = this.mapDataService.getAttractionById(this.attractionId);
        console.log('Active Attraction', this.attraction.name);
        this.activeAttractionService.setActiveAttractionId(this.attractionId);

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

  ionViewWillEnter() {
    this.reloadLocTypes();
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

  /** Make sure we've got a currently ordered list of Loc Types. */
  reloadLocTypes() {
    this.locTypes = [];
    this.locationTypeService.allLocationTypes().forEach(
      (locationType) => {
        this.locTypes.push(
          {
            value: locationType.id,
            text: locationType.name
          }
        );
      }
    );
  }

}
