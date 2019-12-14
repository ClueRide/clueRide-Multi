/* tslint:disable:component-class-suffix */
import { Component, OnInit } from '@angular/core';
import {Member} from '../../api/member/member';
import {ProfileService} from '../../api/profile/profile.service';
import {RegStateService} from '../state/reg-state.service';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'cr-confirm',
  templateUrl: './confirm.page.html',
  styleUrls: ['./confirm.page.scss'],
})
export class ConfirmPage implements OnInit {

  readonly member: Member;

  constructor(
    private regStateService: RegStateService,
    private profileService: ProfileService,
  ) {
    this.member = profileService.getMemberFromToken();
  }

  ngOnInit() {
  }

  public useThisEmail() {
    console.log('Use this Email');
    this.regStateService.confirm();
  }

  public chooseDifferentEmail() {
    console.log('Choose different Email');
    this.regStateService.retry();
  }
}
