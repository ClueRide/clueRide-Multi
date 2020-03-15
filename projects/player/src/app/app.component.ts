import {Component} from '@angular/core';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {Platform} from '@ionic/angular';
import {
  AwaitRegistrationService,
  BadgeAwardService,
  PlatformStateService,
  ProfileService
} from 'cr-lib';
import {ShowGameService} from './show-game/show-game.service';
import {AppStateService} from './state/app/app-state.service';
import {GameRoutingService} from './state/game-routing.service';
import {GameStateService} from './state/game/game-state.service';
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
    },
    {
      title: 'About',
      url: '/about',
      icon: 'information-circle'
    }
  ];

  constructor(
    private appStateService: AppStateService,
    private authClient: AwaitRegistrationService,
    private badgeAwardService: BadgeAwardService,
    private gameRoutingService: GameRoutingService,
    private gameStateService: GameStateService,
    private loadStateService: LoadStateService,
    private platform: Platform,
    private platformStateService: PlatformStateService,
    private profileService: ProfileService,
    private showGameService: ShowGameService,
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
        .subscribe(registrationActive => {
          if (registrationActive) {
            console.log('Registered');
            /* Proceed with pulling up the profile under which we've registered. */
            this.profileService.loadMemberProfile().subscribe(
              () => {
                /* When we have the profile, we do a few things: */
                this.loadStateService.getLoadStateObservable().subscribe(
                  loadReady => {
                    if (loadReady) {
                      /* Setup navigation responses to GameState changes. */
                      this.gameStateService.setupSseEventSubscription();
                      this.gameRoutingService.setupSubscriptions();
                      this.showGameService.showGame();
                      this.badgeAwardService.initializeSubscription();
                    }
                  }
                );

                // this.appStateService.checkInviteIsAccepted()
                //   .then()
                //   .catch();

                /* Bring in the data for this outing. */
                this.loadStateService.loadOutingData();
              }
            );
          }
        });
    });
  }
}
