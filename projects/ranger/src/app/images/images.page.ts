import {
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import {Router} from '@angular/router';
import {
  Attraction,
  CategoryAttractionService,
  Image,
  ImageService
} from 'cr-lib';
import {Subscription} from 'rxjs';
import {ActiveAttractionService} from '../edit/active-attraction.service';

/**
 * Presents all images associated with a Location.
 */
@Component({
  selector: 'app-images',
  templateUrl: './images.page.html',
  styleUrls: ['./images.page.scss'],
})
export class ImagesPage implements OnInit, OnDestroy {

  /* Exposed for the view. */
  public attraction: Attraction;
  public images: Image[] = [];

  private subscription: Subscription;

  constructor(
    private imageService: ImageService,
    private activeAttractionService: ActiveAttractionService,
    private categoryAttractionService: CategoryAttractionService,
    private router: Router,
  ) {
    console.log('Hello, Image Page');
  }

  ngOnInit() {
    console.log('Image Page OnInit()');
    this.subscription = this.activeAttractionService.getActiveAttractionId()
      .subscribe(
        (id) => {
          this.attraction = this.categoryAttractionService.getAttraction(id);
          console.log('Image Page receiving attractionId', this.attraction.id);

          this.imageService.getAllImagesForLocation(this.attraction.id)
            .subscribe(
              (images) => {
                this.images = images;
              }
            );
        }
      );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  isFeaturedImage(imageId: number) {
    return this.attraction.featuredImage && imageId === this.attraction.featuredImage.id;
  }

  setFeaturedImage(imageId: number) {
    this.imageService.setFeaturedImage(this.attraction.id, imageId)
      .subscribe(
        (attraction: Attraction) => {
          this.attraction.featuredImage = attraction.featuredImage;
        }
      );
  }

  save() {
    this.router.navigate(['edit', this.attraction.id, 'place']);
  }

  /* TODO: CI-51 remove image. */
  removeImage(imageId: number): void {
    console.log('Not yet implemented -- remove', imageId);
  }

}
