import {Component} from '@angular/core';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {Platform} from '@ionic/angular';
import {
  AwaitRegistrationService,
  PlatformStateService,
  ProfileService
} from 'cr-lib';
import {AppStateService} from './state/app/app-state.service';
import {LoadStateService} from './state/load/load-state.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Team',
      url: '/team',
      icon: 'contacts'
    }
  ];

  constructor(
    private appStateService: AppStateService,
    private loadStateService: LoadStateService,
    private platform: Platform,
    private platformStateService: PlatformStateService,
    private profileService: ProfileService,
    private authClient: AwaitRegistrationService,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {

      if (this.platformStateService.isNativeMode()) {
        /* Since this is a cordova native statusbar, only set style if not within a browser (local). */
        this.statusBar.styleDefault();
        /* TODO: Maybe not hide until we're sure we are registered? */
        this.splashScreen.hide();
      }

      this.authClient.getRegistrationActiveObservable('com.clueride.player')
        .subscribe(ready => {
          if (ready) {
            console.log('Registered');
            /* Proceed with the application. */
            this.profileService.loadMemberProfile().subscribe(
              () => {
                this.appStateService.checkInviteIsAccepted()
                  .then()
                  .catch();
                this.loadStateService.loadOutingData();
              }
            );
          }
        });
    });
  }
}
