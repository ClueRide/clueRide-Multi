import {Component} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {NavController, NavParams} from '@ionic/angular';

/**
 * Displays the Badges awarded to the current session.
 */

@Component({
  selector: 'cr-page-badges',
  templateUrl: 'badges.page.html',
})
// tslint:disable-next-line:component-class-suffix
export class BadgesPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public titleService: Title,
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BadgesPage');
  }

  ionViewDidEnter() {
    // TODO: Do we need to explicitly set the Title?
    // this.titleService.setTitle("Badges");
  }

}
