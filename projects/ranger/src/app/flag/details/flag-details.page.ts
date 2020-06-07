import {
  Component,
  OnInit
} from '@angular/core';
import {
  Flag,
  FlagService
} from 'cr-lib';
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
    private flagService: FlagService,
  ) { }

  ngOnInit() {
    this.flag = this.navParams.data.flag;
  }

  async save() {
    this.flagService.addFlag(this.flag).subscribe(
      (newFlag: Flag) => {
        console.table(newFlag);
        this.flag = newFlag;
      }
    );
    await this.modalController.dismiss(this.flag);
  }

}
