import {
  Component,
  Input,
  OnInit
} from '@angular/core';
import {
  Flag,
  FlaggedAttribute,
  FlaggedAttributeService,
  FlagReason,
  FlagReasonService
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

  /* Choices for the Reason Action Sheet. */
  static reasonButtons = [];
  /* Choices for the Flagged Attribute Action Sheet. */
  static flaggedAttributeButtons = [];

  private flag: Flag;

  constructor(
    private actionSheetController: ActionSheetController,
    private modalController: ModalController,
    private flagReasonService: FlagReasonService,
    private flaggedAttributeService: FlaggedAttributeService,
  ) {
    FlagButtonComponent.reasonButtons = [];
    this.flagReasonService.getFlagReasons().subscribe(
      (reasons) => {
        reasons.forEach(
          (flagReason: FlagReason) => {
            FlagButtonComponent.reasonButtons.push({
              text: flagReason,
              handler: () => {this.reasonActionHandler(flagReason)}
            });
          }
        );
      }
    );
    FlagButtonComponent.reasonButtons.push({text: 'Cancel', role: 'cancel' });

    FlagButtonComponent.flaggedAttributeButtons = [];
    this.flaggedAttributeService.getFlaggedAttributes().subscribe(
      (attributes) => {
        attributes.forEach(
          (flaggedAttribute: FlaggedAttribute) => {
            FlagButtonComponent.flaggedAttributeButtons.push({
              text: flaggedAttribute,
              handler: () => {this.attributeActionHandler(flaggedAttribute)}
            });
          }
        );
      }
    );
    FlagButtonComponent.flaggedAttributeButtons.push({text: 'Cancel', role: 'cancel' });
  }

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
      buttons: FlagButtonComponent.reasonButtons
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
      buttons: FlagButtonComponent.flaggedAttributeButtons
    });

    await actionSheet.present();
  }

  private attributeActionHandler(attribute: FlaggedAttribute) {
    this.flag.flaggedAttribute = attribute;
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
