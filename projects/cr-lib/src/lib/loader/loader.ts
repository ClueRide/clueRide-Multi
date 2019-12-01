import {Component, OnDestroy, OnInit} from '@angular/core';
import {LoadingController} from '@ionic/angular';

@Component({
  selector: 'cr-loader',
  templateUrl: 'loader.html'
})
export class LoaderComponent implements OnInit, OnDestroy {

  private loading: any;

  constructor(
    private loadingController: LoadingController
  ) {
    console.log('Hello LoaderComponent Component');
  }

  ngOnInit(): void {
    this.loading = this.loadingController.create(
      {
        spinner: 'crescent',
        message: 'Buckling my helmet'
      }
    ).then(dialog => {
      dialog.present();
    });
  }

  ngOnDestroy(): void {
    this.loading.dismiss();
  }

}
