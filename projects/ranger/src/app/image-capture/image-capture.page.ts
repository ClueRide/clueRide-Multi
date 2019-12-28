import {
  Component,
  OnInit
} from '@angular/core';
import {
  ActivatedRoute,
  NavigationExtras,
  Router
} from '@angular/router';
import {
  Camera,
  CameraOptions
} from '@ionic-native/camera/ngx';
import {LoadingController} from '@ionic/angular';
import {
  Attraction,
  ImageService
} from 'cr-lib';
import {from} from 'rxjs';

@Component({
  selector: 'app-image-capture',
  templateUrl: './image-capture.page.html',
  styleUrls: ['./image-capture.page.scss']
})
export class ImageCapturePage implements OnInit {

  /* Exposed to the View: */
  public attraction: Attraction;
  public base64Image: string;
  public images: Array<any> = [];

  private cameraOptions: CameraOptions = {
    correctOrientation: true,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    quality: 90,
    targetWidth: 1000,
    targetHeight: 1000
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private camera: Camera,
    private imageService: ImageService,
    private loadingCtrl: LoadingController,
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(
      (params) => {
        if (this.router.getCurrentNavigation().extras.state) {
          const extras: NavigationExtras = this.router.getCurrentNavigation().extras;
          this.attraction = extras.state.attraction;

          if (extras.state.mode === 'gallery') {
            this.cameraOptions.sourceType = this.camera.PictureSourceType.PHOTOLIBRARY;
          }
        }
      }
    );
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter ImageCapturePage');
    this.camera.getPicture(
      this.cameraOptions
    ).then((imageData) => {
      //   imageData is a base64 encoded string
      this.base64Image = 'data:image/jpeg;base64,' + imageData;
      this.images.unshift(
        {src: this.base64Image}
      );
    }, (err) => {
      console.log(err);
    });
  }

  public haveImagesToShow(): boolean {
    return (this.images.length > 0);
  }

  public async save() {
    const loading = await this.loadingCtrl.create(
      {
        message: 'Finding a good spot for that fine picture ...'
      }
    );
    await loading.present();

    this.imageService.uploadImage(
      this.bundleImageForSaving()
    ).subscribe(
      (uploadedImage) => {
        console.log('New Image ID: ' + uploadedImage.id);
        loading.dismiss();
        from (this.router.navigate(['images', this.attraction.id])).subscribe(
          () => {console.log('Have returned from Image Capture'); }
        );
      }
    );
  }

  /**
   * Takes the captured image and bundles it up for posting to the ImageService for upload.
   */
  bundleImageForSaving(): FormData {
    const formData = new FormData();
    const image = {
      locationId: this.attraction.id,
      lat: this.attraction.latLon.lat,
      lon: this.attraction.latLon.lon,
      fileData: new FormData()
    };

    const blob = new Blob([this.images[0].src], {type: 'image/jpeg'});
    formData.append('locationId', '' + image.locationId);
    formData.append('lat', '' + image.lat);
    formData.append('lon', '' + image.lon);
    formData.append('fileData', blob, 'cameraImage.jpg');

    return formData;
  }

  fakeImage() {
    this.images.unshift({src: 'Test Data'});
  }

}
