import { Component, OnInit } from '@angular/core';
import {RegStateService} from '../../state/reg/reg-state.service';
import {PlatformStateService} from '../../state/platform/platform-state.service';
import {Title} from '@angular/platform-browser';

@Component({
  // TODO: CI-11 update references to this component.
  // selector: 'registration',
  selector: 'cr-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
// tslint:disable-next-line:component-class-suffix
export class RegistrationPage implements OnInit {

  constructor(
    private regState: RegStateService,
    private platformState: PlatformStateService,
    private titleService: Title,
  ) { }

  // TODO: Do we need to explicitly set the Title?
  // This was done in Ionic 3 pages to allow the browser tab to show the title properly.

  ngOnInit() {
  }

  /**
   * Accepts user choice of registering via Social Media and delegates to RegStateService.
   *
   * This choice is preferred because we can pickup an image for the user.
   */
  public registerSocial(): void {
    this.regState.registerSocial();
  }

  /**
   * Accepts user choice of registering via Email and delegates to RegStateService.
   */
  public registerEmail(): void {
    this.regState.registerPasswordless();
  }

  // TODO: Are we ready to break the BDD Register button?
  public shouldHideBDD(): boolean {
    return this.platformState.isNativeMode();
  }

}
