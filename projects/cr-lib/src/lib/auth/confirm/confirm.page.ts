/* tslint:disable:component-class-suffix */
import { Component, OnInit } from '@angular/core';
import {RegStateService} from '../../state/reg/reg-state.service';
import {Title} from '@angular/platform-browser';

@Component({
  // TODO: CI-11 update the references to this component.
  // selector: 'confirm',
  selector: 'cr-confirm',
  templateUrl: './confirm.page.html',
  styleUrls: ['./confirm.page.scss'],
})
export class ConfirmPage implements OnInit {

  constructor(
    private regStateService: RegStateService,
    private titleService: Title,
  ) { }

  ngOnInit() {
  }

  // TODO: Do we need to explicitly set the Title?
  // This was done in Ionic 3 pages to allow the browser tab to show the title properly.

  public useThisEmail() {
    console.log('Use this Email');
    this.regStateService.confirm();
  }

  public chooseDifferentEmail() {
    console.log('Choose different Email');
    this.regStateService.retry();
  }
}
