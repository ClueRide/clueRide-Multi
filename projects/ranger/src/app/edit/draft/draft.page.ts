import {
  Component,
  OnInit
} from '@angular/core';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import {AlertController} from '@ionic/angular';
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
  selector: 'app-draft',
  templateUrl: './draft.page.html',
  styleUrls: ['./draft.page.scss'],
})
export class DraftPage implements OnInit {

  /* Exposed for the view. */
  public attraction: Attraction;
  public hasMultipleImages = false;
  public locTypes = [];
  public attractionId: number;

  private subscription: Subscription;

  constructor(
    private activeAttractionService: ActiveAttractionService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private mapDataService: MapDataService,
    private alertCtrl: AlertController,
    // private imageService: ImageService,
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
    // this.imageService.hasMultipleImages(this.attraction.id)
    //   .subscribe(
    //     (hasMultipleImages) => {this.hasMultipleImages = hasMultipleImages; }
    //   );
  }

  //noinspection JSMethodCanBeStatic
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

  /** Opens the Page that performs Camera operations passing the the attraction and the "Camera" flag. */
  captureImage() {
    console.log('Opening Camera');
    // TODO: CI-42 Image Capture Page
    // this.navCtrl.push(ImageCapturePage, {
    //   attraction: this.attraction,
    //   mode: 'camera'
    // });
  }

  /** Opens the Page that performs Gallery upload operations passing the the attraction and the "Gallery" flag. */
  imageFromGallery() {
    console.log('Opening Gallery');
    // TODO: CI-42 Image Capture Page
    // this.navCtrl.push(ImageCapturePage, {
    //   attraction: this.attraction,
    //   mode: 'gallery'
    // });
  }

  showImageActions() {
    console.log('Show Image Actions');
    const alert = this.alertCtrl.create({
      // TODO: Move this forward to Ionic 4
      // title: 'Unlink this Image?',
      message: 'Do you want to unset the Featured Image? (Image can be re-featured later)',
      buttons: [
        {
          text: 'Keep Featured Image',
          handler: () => {
            console.log('Keep');
          }
        },
        {
          text: 'Unset Featured Image',
          handler: () => {
            console.log('Removing Featured Image');
            this.locationService.removeFeaturedImage(this.attraction.id).subscribe(
              (attraction) => {
                // TODO: Just noticed that this will overwrite any other changes
                this.attraction = attraction;
              }
            );
          }
        }
      ]
    });

    // TODO: Move this forward to Ionic 4
    // alert.present();
  }

  showOtherImages() {
    // TODO: CI-41 Images Page
    // this.navCtrl.push(
    //   ImagesPage,
    //   {attraction: this.attraction}
    // );
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
