/* tslint:disable:no-debugger */
import {
  ErrorHandler,
  Injectable
} from '@angular/core';
import {ToastController} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorHandler extends ErrorHandler {

  constructor(
    private toastController: ToastController
  ) {
    super();
  }

  handleError(error: any): void {
    super.handleError(error);
    this.presentToast(error);
  }

  async presentToast(error: any) {
    const toast = await this.toastController.create({
      header: 'Caught Exception:',
      message: error.message,
      duration: 6000,
      showCloseButton: true,
      color: 'danger'
    });
    toast.present();
  }

}
