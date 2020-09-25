import {
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import {AlertController} from '@ionic/angular';
import {
  Attraction,
  CategoryAttractionService,
  ImageService,
  LocationService
} from 'cr-lib';
import {Subscription} from 'rxjs';
import {MapDataService} from '../../map/data/map-data.service';
import {ActiveAttractionService} from '../active-attraction.service';
import {EditService} from '../edit.service';

@Component({
  selector: 'app-place-tab',
  templateUrl: './place-tab.page.html',
  styleUrls: ['./place-tab.page.scss'],
})
export class PlaceTabPageComponent implements OnInit, OnDestroy {

  /* Expose instance to be edited. */
  public attraction: Attraction;
  public attractionId: number;
  public hasMultipleImages = false;

  private subscription: Subscription;

  constructor(
    private activeAttractionService: ActiveAttractionService,
    private activatedRoute: ActivatedRoute,
    private alertController: AlertController,
    private categoryAttractionService: CategoryAttractionService,
    private editService: EditService,
    private imageService: ImageService,
    private locationService: LocationService,
    private mapDataService: MapDataService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.subscription = this.activatedRoute.queryParams.subscribe(
      (params) => {
        this.attractionId = parseInt(this.activatedRoute.snapshot.paramMap.get('id'), 10);
        this.attraction = this.categoryAttractionService.getAttraction(this.attractionId);
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
    this.imageService.hasMultipleImages(this.attraction.id)
      .subscribe(
        (hasMultipleImages) => {this.hasMultipleImages = hasMultipleImages; }
      );
  }

  // TODO: CI-51 Long Press response
  showImageActions() {
    console.log('Show Image Actions');
    const alert = this.alertController.create({
      header: 'Unlink this Image?',
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

  }

  /**
   * Invoked when the user is ready to persist changes.
   */
  save() {
    this.editService.save(this.attraction);
  }

  /** Opens the Page that performs Camera operations passing the the attraction and the "Camera" flag. */
  captureImage() {
    console.log('Opening Camera');
    this.router.navigate(
      ['image-capture'],
      {state: {
          attraction: this.attraction,
          mode: 'camera'
        }}
    );
  }

  /** Opens the Page that performs Gallery upload operations passing the the attraction and the "Gallery" flag. */
  imageFromGallery() {
    console.log('Opening Gallery');
    this.router.navigate(
      ['image-capture'],
      {state: {
          attraction: this.attraction,
          mode: 'gallery'
        }}
    );
  }

  showOtherImages() {
    console.log('Showing Other Images for ID ', this.attractionId);

    this.router.navigate(
      ['images', this.attractionId]
    ).then(() => {
      console.log('Successful launch of Image Page');
    }).catch( (error) => {
      console.log('Failed to launch Image Page: ', error);
    });
  }

}
