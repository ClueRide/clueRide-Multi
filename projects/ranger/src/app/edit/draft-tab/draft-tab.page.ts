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
  Category,
  CategoryService,
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
  public selectedCategory: Category;
  public categories = [];

  private subscription: Subscription;

  constructor(
    private activeAttractionService: ActiveAttractionService,
    private activatedRoute: ActivatedRoute,
    private categoryService: CategoryService,
    private locationService: LocationService,
    private locationTypeService: LocTypeService,
    private mapDataService: MapDataService,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.subscription = this.activatedRoute.queryParams.subscribe(
      (params) => {
        this.attractionId = parseInt(this.activatedRoute.snapshot.paramMap.get('id'), 10);
        this.attraction = this.mapDataService.getAttractionById(this.attractionId);
        this.activeAttractionService.setActiveAttractionId(this.attractionId);
        if (this.attraction.locationType && this.attraction.locationType.category) {
          this.selectedCategory = this.attraction.locationType.category;
        }

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
    console.log('populating categories');
    this.categoryService.getAllCategories().subscribe(
      (category) => {
        this.categories.push(category);
      }
    );
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
    // TODO: This should wait for a good response from the save.
    this.router.navigate(['home']);
  }

  compareLocType = (o1, o2) => {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  }

  compareCategory = (o1, o2) => {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  }

  categoryHasChanged = (event) => {
    this.attraction.locationType = null;
    this.locTypes = this.locationTypeService.getByCategoryId(this.selectedCategory.id);
  }

  /** Make sure we've got a currently ordered list of Loc Types. */
  reloadLocTypes() {
    this.locTypes = [];
    this.locationTypeService.allLocationTypes().forEach(
      (locationType) => {
        this.locTypes.push(
          locationType
        );
      }
    );
  }

}
