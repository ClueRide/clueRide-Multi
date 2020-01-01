import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {ToastController} from '@ionic/angular';
import {
  Observable,
  throwError
} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(
    private toastController: ToastController
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        /* Not clear that I'll want retries just yet. */
        // retry(1),
        catchError((error: HttpErrorResponse) => {
          let errorMessage = '';
          if (error.error instanceof ErrorEvent) {
            // client-side error
            errorMessage = `Error: ${error.error.message}`;
          } else {
            // server-side error
            errorMessage = `Message: ${error.error}`;
          }
          this.presentToast(error, errorMessage);

          return throwError(errorMessage);
        })
      );
  }

  async presentToast(
    error: HttpErrorResponse,
    messageToShow: string
  ) {
    const toast = await this.toastController.create({
      header: 'Status: ' + error.statusText + '(' + error.status + ')',
      message: messageToShow,
      duration: 6000,
      showCloseButton: true,
      color: 'danger'
    });
    toast.present();
  }

}
