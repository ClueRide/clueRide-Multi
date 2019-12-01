import {AfterContentInit, Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {
  Member,
  ProfileService
} from 'cr-lib';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, AfterContentInit {

  member: Member | any = {};

  constructor(
    private profileService: ProfileService,
    private titleService: Title
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

  ngAfterContentInit(): void {
    this.titleService.setTitle('Home');
  }

}
