import {Component} from '@angular/core';
import {
  LoadStateService,
  Member,
  ProfileService
} from 'cr-lib';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  // TODO CI-145 - move into the component.
  member: Member | any = {};

  constructor(
    private profileService: ProfileService,
    private loadStateService: LoadStateService,
  ) {}

  ionViewDidEnter() {
    console.log('HomePage ViewDidEnter()');
    /* This may need to happen regardless of which page we come into. */
    this.loadStateService.loadOutingData();
    /* TODO: CI-145 Same with this, by the way. */
    this.profileService.loadMemberProfile()
      .subscribe(
        (member) => {
          this.member = member;
        }
      );
  }

}
