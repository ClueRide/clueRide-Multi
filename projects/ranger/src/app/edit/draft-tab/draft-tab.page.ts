import {
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {
  Attraction,
  AttractionLayerService,
  Category,
  CategoryAttractionService,
  CategoryService,
  LocationService,
  LocationType,
  LocTypeService
} from 'cr-lib';
import {Subscription} from 'rxjs';
import {MapDataService} from '../../map/data/map-data.service';
import {ActiveAttractionService} from '../active-attraction.service';
import {NavController} from '@ionic/angular';

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
export class DraftTabPageComponent implements OnInit, OnDestroy {

  /* Exposed for the view. */
  public attraction: Attraction;
  public locTypes: LocationType[] = [];
  public offeredLocTypes: LocationType[];
  public attractionId: number;
  public selectedCategory: Category;
  public categories: Category[] = [];

  private subscription: Subscription;

  constructor(
    private activeAttractionService: ActiveAttractionService,
    private activatedRoute: ActivatedRoute,
    private attractionLayerService: AttractionLayerService,
    private categoryAttractionService: CategoryAttractionService,
    private categoryService: CategoryService,
    private locationService: LocationService,
    private locationTypeService: LocTypeService,
    private mapDataService: MapDataService,
    private navCtrl: NavController,
  ) {
    this.offeredLocTypes = [];
  }

  ngOnInit() {
    this.subscription = this.activatedRoute.queryParams.subscribe(
      (params) => {
        this.attractionId = parseInt(this.activatedRoute.snapshot.paramMap.get('id'), 10);
        this.attraction = this.categoryAttractionService.getAttraction(this.attractionId);
        this.activeAttractionService.setActiveAttractionId(this.attractionId);

        /* Populate our Category if we have a Location Type defined. */
        if (this.attraction.locationTypeId && this.attraction.locationTypeId !== 0) {
          this.selectedCategory = this.locationTypeService.getById(this.attraction.locationTypeId).category;
          this.offeredLocTypes = this.locationTypeService.getByCategoryId(this.selectedCategory.id);
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
    this.categories = this.categoryService.getAllCategories();
  }

  /**
   * Invoked when the user is ready to persist changes.
   */
  save() {
    console.log('Saving');
    this.locationService.update(this.attraction).subscribe(
      (updatedAttraction: Attraction) => {
        this.mapDataService.updateAttraction(updatedAttraction);
        this.categoryAttractionService.updateAttraction(updatedAttraction);
      }
    );
    // TODO: This should wait for a good response from the save.
    this.navCtrl.back();
  }

  /**
   * Function for comparing to Location Types. It's just the ID we handle here,
   * so this is fairly straightforward.
   */
  compareLocType = (o1, o2) => {
    return o1 && o2 && o1 === o2;
  }

  compareCategory = (o1, o2) => {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  }

  categoryHasChanged = (event) => {
    /* When Category is changed, the Location Type becomes undefined. */
    this.attraction.locationTypeId = 0;
    this.offeredLocTypes = this.locationTypeService.getByCategoryId(this.selectedCategory.id);
  }

  locTypeSelectedText(): string {
    let locationTypeId = 0;

    if (this.attraction && this.attraction) {
      locationTypeId = this.attraction.locationTypeId;
    }

    if (locationTypeId === 0) {
      return null;
    } else {
      if (this.locTypes && this.locTypes[locationTypeId]) {
        return this.locTypes[locationTypeId].name;
      } else {
        return null;
      }
    }
  }

  /** Make sure we've got a currently ordered list of Loc Types. */
  reloadLocTypes() {
    /* Clear what we're presenting. */
    this.locTypes = [];
    this.offeredLocTypes = [];
    this.locationTypeService.allLocationTypes().forEach(
      (locationType) => {
        this.locTypes.push(
          locationType
        );
      }
    );

    /* If we know our category, we can offer a subset of Location Types. */
    if (this.selectedCategory) {
      this.offeredLocTypes = this.locationTypeService.getByCategoryId(this.selectedCategory.id);
    }

  }

  deleteAttraction() {
    this.locationService.delete(this.attractionId).subscribe(
      (location) => {
        console.log('Location is deleted:', location);
        this.attractionLayerService.deleteAttraction(this.attraction);
        this.navCtrl.back();
      }
    );
  }

}
