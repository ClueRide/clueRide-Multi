import {Component} from '@angular/core';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {Platform} from '@ionic/angular';
import {
  AwaitRegistrationService,
  PlatformStateService
} from 'cr-lib';
import {AppStateService} from './app-state/app-state.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [
    {
      title: 'Map',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'List',
      url: '/list',
      icon: 'list'
    }
  ];

  constructor(
    private authClient: AwaitRegistrationService,
    private appStateService: AppStateService,
    private platform: Platform,
    private platformStateService: PlatformStateService,
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
      }

      this.authClient.getRegistrationActiveObservable('com.clueride.ranger')
        .subscribe(ready => {
          if (ready) {
            console.log('Registered');
            /* TODO: CI-15 This may be the time to hide the SplashScreen. */
            this.appStateService.registrationIsNowActive();
          }
        });
    });
  }

}
