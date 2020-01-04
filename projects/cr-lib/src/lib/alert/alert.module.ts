import {CommonModule} from '@angular/common';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {
  ErrorHandler,
  NgModule
} from '@angular/core';
import {IonicModule} from '@ionic/angular';
import {GlobalErrorHandler} from './global-error-handler.service';
import {HttpErrorInterceptor} from './http-error.interceptor';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    IonicModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    },
    /* Override to use our own error handling. */
    {provide: ErrorHandler, useClass: GlobalErrorHandler}
  ]
})
export class AlertToastModule { }
