import {Component} from '@angular/core';
import {PlatformStateService} from '../../state/platform/platform-state.service';
import {RegStateService} from '../state/reg-state.service';

@Component({
  selector: 'cr-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
// tslint:disable-next-line:component-class-suffix
export class RegistrationPage {

  constructor(
    private regState: RegStateService,
    private platformState: PlatformStateService,
  ) { }

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
