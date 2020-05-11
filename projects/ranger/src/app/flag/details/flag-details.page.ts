import {
  Component,
  OnInit
} from '@angular/core';
import {Flag} from 'cr-lib';
import {
  ModalController,
  NavParams
} from '@ionic/angular';

@Component({
  selector: 'app-flag-details',
  templateUrl: './flag-details.page.html',
  styleUrls: ['./flag-details.page.scss'],
})
export class FlagDetailsPage implements OnInit {

  public flag: Flag;

  constructor(
    private modalController: ModalController,
    private navParams: NavParams,
  ) { }

  ngOnInit() {
    this.flag = this.navParams.data.flag;
  }

  async save() {
    // TODO: CI-195 persist the flag.
    console.table(this.flag);
    await this.modalController.dismiss(this.flag);
  }

}
