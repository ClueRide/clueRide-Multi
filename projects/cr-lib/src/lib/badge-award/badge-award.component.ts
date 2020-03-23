import {
  Component,
  OnInit
} from '@angular/core';
import {
  NavParams,
  PopoverController
} from '@ionic/angular';

@Component({
  selector: 'app-badge-award',
  templateUrl: './badge-award.component.html',
  styleUrls: ['./badge-award.component.scss'],
})
export class BadgeAwardComponent implements OnInit {

  readonly badge;

  constructor(
    private navParams: NavParams,
    private popoverController: PopoverController
  ) {
    const badgeEvent = this.navParams.get('badgeEvent');
    this.badge = badgeEvent && badgeEvent.badgeFeatures;
  }

  ngOnInit() {
  }

  dismiss() {
    this.popoverController.dismiss();
  }

  // TODO: Shutting down should pay attention to the Platform signals.
}
