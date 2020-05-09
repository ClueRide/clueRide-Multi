import {
  Component,
  Input,
  OnInit
} from '@angular/core';
import {
  Flag,
  FlagReason
} from 'cr-lib';
import {ActionSheetController} from '@ionic/angular';

@Component({
  selector: 'app-flag-button',
  templateUrl: './flag-button.component.html',
  styleUrls: ['./flag-button.component.scss'],
})
export class FlagButtonComponent implements OnInit {

  @Input() attractionId: number;

  private flag: Flag;

  constructor(
    private actionSheetController: ActionSheetController,
  ) { }

  ngOnInit() {}

  async flagIssue() {
    /* Instantiate Flag record. */
    this.flag = new Flag();
    this.flag.attractionId = this.attractionId;

    /* Present Dialog to capture Reason. */
    const actionSheet = await this.actionSheetController.create({
      header: 'Issue Reason',
      buttons: [
        /* TODO: Replace with list from the back-end. */
        {text: FlagReason.SAFETY, handler: () => {this.actionHandler(FlagReason.SAFETY); }},
        {text: FlagReason.ACCURACY, handler: () => {this.actionHandler(FlagReason.ACCURACY); }},
        {text: FlagReason.FUN_FACTOR, handler: () => {this.actionHandler(FlagReason.FUN_FACTOR); }},
        {text: FlagReason.TIMELINESS, handler: () => {this.actionHandler(FlagReason.TIMELINESS); }},
        {text: 'Cancel', role: 'cancel' }
      ]
    });

    await actionSheet.present();
  }

  private actionHandler(reason: FlagReason) {
    this.flag.reason = reason;
    console.log(this.flag);
  }

}
