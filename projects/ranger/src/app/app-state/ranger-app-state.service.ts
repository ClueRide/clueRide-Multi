import {Injectable} from '@angular/core';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {
  NavController,
  Platform
} from '@ionic/angular';
import {
  AttractionLayerService,
  AttractionService,
  CategoryAttractionService,
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
import {RangerAppState} from './ranger-app-state';
import {MapPositionService} from '../map/position/map-position.service';

/**
 * Tracks the progression of tests and checks that are performed as the app
 * is brought up. Can also serve as an overall status page.
 */
@Injectable({
  providedIn: 'root'
})
export class RangerAppStateService {

  private appState: RangerAppState = new RangerAppState();
  private platformReady$: Observable<any>;

  constructor(
    private platform: Platform,
    private nav: NavController,
    private attractionService: AttractionService,
    private attractionLayerService: AttractionLayerService,
    private categoryAttractionService: CategoryAttractionService,
    private geoLoc: GeoLocService,
    private mapDataService: MapDataService,
    private mapPositionService: MapPositionService,
    public platformStateService: PlatformStateService,
    private profileService: ProfileService,
    public splashScreen: SplashScreen,
    private sseService: ServerEventsService,
  ) {
    console.log('Hello RangerAppStateService Provider');
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

    /* When we have the member profile, we can establish the SSE Session. */
    this.profileService.loadMemberProfile().subscribe(
      () => {
        this.sseService.getEventSource().subscribe();
        this.sseService.openChannel(null);
      }
    );

    console.log('RangerAppStateService: Awaiting Initial Position');
    this.geoLoc.notifyWhenReady().subscribe(
      (initialPosition) => {
        console.log('RangerAppStateService: Initial Position is obtained');

        /* Load all the data before transitioning to the Home/Map page. */
        this.mapDataService.initializeCaches().subscribe(
          () => {
            console.log('RangerAppStateService: Attraction Layers are loaded');
            this.appState.readyToOpen = true;
            this.appState.cacheState = 'filled';
            this.nav.navigateRoot('home').then(
              () => {}
            );
          }
        );
      }
    );

  }

  /** Exposes a summary of the Application State to clients of this service. */
  public getAppState(): RangerAppState {
    return this.appState;
  }

  /**
   * Starts out false, and turns true once we're ready to open the map.
   */
  public isAppReadyToOpen(): boolean {
    return this.appState.readyToOpen;
  }

}
