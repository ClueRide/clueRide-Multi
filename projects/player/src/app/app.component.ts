import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {PlatformStateService} from 'cr-lib';
import {AwaitRegistrationService} from 'cr-lib';

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
      title: 'List',
      url: '/list',
      icon: 'list'
    }
  ];

  constructor(
    private platform: Platform,
    private platformStateService: PlatformStateService,
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
            // TODO: Kick off the application loading.
          }
        });
    });
  }
}
