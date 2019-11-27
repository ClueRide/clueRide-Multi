import {Component, OnInit} from '@angular/core';
import {NavController} from '@ionic/angular';
import {BadgeProgress} from '../../badge-progress/badge-progress';
import {BadgeProgressService} from '../../badge-progress/badge-progress.service';
import {Badge} from '../badge';
import {BadgeService} from '../badge.service';

/**
 * Generated class for the BadgeSummaryComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  // TODO: CI-11 update references to this component.
  // selector: 'badge-summary'
  selector: 'cr-badge-summary',
  templateUrl: 'badge-summary.html'
})
export class BadgeSummaryComponent implements OnInit {
  badges: Array<Badge>;
  chips: Array<BadgeProgress>;

  constructor(
    private badgeService: BadgeService,
    public navCtrl: NavController,
    private badgeProgressService: BadgeProgressService,
  ) {
  }

  ngOnInit() {
    /* Consider caching these. */
    this.badgeService.getList().subscribe(
      (response) => {
        this.badges = response;
      }
    );

    this.badgeProgressService.getProgressChips().subscribe(
      (response) => {
        this.chips = response;
      }
    );
  }

  public viewDetails() {
    // TODO: CR-10 routing
    // this.navCtrl.push(BadgesPage);
  }

}
