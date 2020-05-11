import {
  Component,
  Input,
  OnInit
} from '@angular/core';
import {
  Flag,
  FlaggedAttribute,
  FlagReason
} from 'cr-lib';
import {
  ActionSheetController,
  ModalController
} from '@ionic/angular';
import {FlagDetailsPage} from '../details/flag-details.page';

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
    private modalController: ModalController,
  ) { }

  ngOnInit() {}

  /**
   * Invoked in response to user request to flag the Attraction with an issue.
   *
   * This begins the process by recording the Attraction ID and via user input,
   * the Reason the issue is being flagged.
   */
  async flagIssue() {
    /* Instantiate Flag record. */
    this.flag = new Flag();
    this.flag.attractionId = this.attractionId;

    /* Present Dialog to capture Reason. */
    const actionSheet = await this.actionSheetController.create({
      header: 'Choose the Reason for this Issue',
      buttons: [
        /* TODO: CI-195 Replace with list from the back-end. */
        {text: FlagReason.SAFETY, handler: () => {this.reasonActionHandler(FlagReason.SAFETY); }},
        {text: FlagReason.ACCURACY, handler: () => {this.reasonActionHandler(FlagReason.ACCURACY); }},
        {text: FlagReason.FUN_FACTOR, handler: () => {this.reasonActionHandler(FlagReason.FUN_FACTOR); }},
        {text: FlagReason.TIMELINESS, handler: () => {this.reasonActionHandler(FlagReason.TIMELINESS); }},
        {text: 'Cancel', role: 'cancel' }
      ]
    });

    await actionSheet.present();
  }

  private reasonActionHandler(reason: FlagReason) {
    this.flag.reason = reason;
    console.log(this.flag);
    this.captureFlaggedAttribute();
  }

  async captureFlaggedAttribute() {
    const actionSheet = await this.actionSheetController.create({
      header: 'What part has an Issue?',
      buttons: [
        /* TODO: CI-195 Replace with list from the back-end. */
        {text: 'The Attraction itself', handler: () => {this.attributeActionHandler(null); }},
        {text: FlaggedAttribute.NAME, handler: () => {this.attributeActionHandler(FlaggedAttribute.NAME); }},
        {text: FlaggedAttribute.DESCRIPTION, handler: () => {this.attributeActionHandler(FlaggedAttribute.DESCRIPTION); }},
        {text: FlaggedAttribute.CATEGORY_OR_TYPE, handler: () => {this.attributeActionHandler(FlaggedAttribute.CATEGORY_OR_TYPE); }},
        {text: FlaggedAttribute.MAIN_LINK, handler: () => {this.attributeActionHandler(FlaggedAttribute.MAIN_LINK); }},
        {text: FlaggedAttribute.OTHER_LINK, handler: () => {this.attributeActionHandler(FlaggedAttribute.OTHER_LINK); }},
        {text: FlaggedAttribute.PREFERRED_IMAGE, handler: () => {this.attributeActionHandler(FlaggedAttribute.PREFERRED_IMAGE); }},
        {text: FlaggedAttribute.OTHER_IMAGE, handler: () => {this.attributeActionHandler(FlaggedAttribute.OTHER_IMAGE); }},
        {text: FlaggedAttribute.PUZZLE, handler: () => {this.attributeActionHandler(FlaggedAttribute.PUZZLE); }},
        {text: FlaggedAttribute.ANSWER, handler: () => {this.attributeActionHandler(FlaggedAttribute.ANSWER); }},
        {text: 'Cancel', role: 'cancel' }
      ]
    });

    await actionSheet.present();
  }

  private attributeActionHandler(attribute: FlaggedAttribute) {
    this.flag.details = {
      attribute,
      description: ''
    };
    console.table(this.flag);
    this.openDetailsPopover();
  }

  private async openDetailsPopover() {
    const modal = await this.modalController.create({
      component: FlagDetailsPage,
      componentProps: {
        "flag": this.flag,
      }
    });

    modal.onDidDismiss().then((dataReturned) => {
      console.table(this.flag);
    });

    return await modal.present();
  }

}
