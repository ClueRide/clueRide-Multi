import {Injectable} from '@angular/core';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {
  NavController,
  Platform
} from '@ionic/angular';
import {
  GeoLocService,
  PlatformStateService,
  ProfileService,
  ServerEventsService
} from 'cr-lib';
import {Observable} from 'rxjs';
import {fromPromise} from 'rxjs/internal-compatibility';
import {
  share,
  tap
} from 'rxjs/operators';
import {MapDataService} from '../map/data/map-data.service';
import {AppState} from './app-state';

/**
 * Tracks the progression of tests and checks that are performed as the app
 * is brought up. Can also serve as an overall status page.
 */
@Injectable({
  providedIn: 'root'
})
export class AppStateService {

  private appState: AppState = new AppState();
  private platformReady$: Observable<any>;

  constructor(
    private platform: Platform,
    private nav: NavController,
    private geoLoc: GeoLocService,
    private mapDataService: MapDataService,
    public platformStateService: PlatformStateService,
    private profileService: ProfileService,
    public splashScreen: SplashScreen,
    private sseService: ServerEventsService,
  ) {
    console.log('Hello AppStateService Provider');
    this.appState.isRunningBrowser = !this.platformStateService.isNativeMode();
    this.initPlatformReadyObservable();

    if (this.platformStateService.isNativeMode()) {
      /* Map is ready; turn off splash screen. */
      this.splashScreen.hide();
    }

  }

  /**
   * Lazy initialization of the Platform Observable; will be initialized if someone needs it before we've
   * gotten it ready ourselves.
   */
  initPlatformReadyObservable() {
    /* Setup Platform Ready response to trigger whoever needs to listen for it. */
    this.platformReady$ = fromPromise(
      this.platform.ready()
    ).pipe(
      tap(() => console.log('App State Service: Platform Ready')),
      share()
    );
  }

  /**
   * Accepts subscribers to the Platform Ready Observable
   * and creates the observable if it hasn't been done yet.
   * @param subscriberFunction - function to be executed when
   * the Platform becomes ready for business.
   */
  public onPlatformReady(subscriberFunction) {
    console.log('On Platform Ready - Subscriber Added');

    if (!this.platformReady$) {
      this.initPlatformReadyObservable();
    }

    this.platformReady$.subscribe(subscriberFunction);
  }

  /**
   * Sequences a number of components and services needed prior to
   * displaying the map page.
   */
  public registrationIsNowActive = (): void => {

    console.log('About to initialize caches');
    this.appState.cacheState = 'empty';
    const cacheInit$ = this.mapDataService.initializeCaches();

    cacheInit$.subscribe(
      () => {
        this.appState.cacheState = 'filled';
      }
    );

    /* When we have the member profile, we can establish the SSE Session. */
    this.profileService.loadMemberProfile().subscribe(
      () => {
        this.sseService.getEventSource().subscribe();
        this.sseService.initializeSubscriptions(null);
      }
    );

    this.geoLoc.notifyWhenReady().subscribe(
      (initialPosition) => {
        console.log('We do get something out');
        this.nav.navigateRoot('home').then(
          () => {
            return this.mapDataService.postInitialPosition(
              initialPosition
            );
          }
        );
      }
    );

  }

  /** Exposes a summary of the Application State to clients of this service. */
  public getAppState(): AppState {
    return this.appState;
  }

}
