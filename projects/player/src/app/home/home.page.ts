import {
  AfterContentInit,
  Component,
  OnInit
} from '@angular/core';
import {
  Member,
  ProfileService
} from 'cr-lib';
import {LoadStateService} from '../state/load/load-state.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, AfterContentInit {

  member: Member | any = {};

  constructor(
    private profileService: ProfileService,
    private loadStateService: LoadStateService,
  ) {}

  ngOnInit(): void {
  }

  ngAfterContentInit(): void {
  }

  ionViewDidEnter() {
    console.log('HomePage ViewDidEnter()');
    /* This may need to happen regardless of which page we come into. */
    this.loadStateService.loadOutingData();
    /* Same with this, by the way. */
    this.profileService.loadMemberProfile()
      .subscribe(
        (member) => {
          this.member = member;
        }
      );
  }

}
