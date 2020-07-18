import {Injectable} from '@angular/core';
import {LoadingController} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  constructor(
    private loadingController: LoadingController,
  ) { }

  /**
   * Turns on the overlay loader until explicitly hidden.
   */
  public showLoader(message: string): void {
    this.loadingController.create({
      message: message
    }).then((res) => {
      res.present();
    });
  }

  /**
   * Closes the loader once the loading operation is completed.
   */
  public hideLoader(): void {
    this.loadingController.dismiss().then((res) => {
      console.log('Loading dismissed!', res);
    }).catch((error) => {
      console.log('error', error);
    });
  }

}
