import {Component, OnInit} from '@angular/core';
import {
  Member,
  ProfileService
} from 'cr-lib';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  member: Member | any = {};

  constructor(
    private profileService: ProfileService
  ) {}

  ngOnInit(): void {
    this.profileService.loadMemberProfile()
      .subscribe(
        (member) => {
          this.member = member;
        }
      );
    // this.loadStateService.loadOutingData();
  }

}
