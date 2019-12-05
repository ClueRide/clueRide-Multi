// import Auth0Cordova from '@auth0/cordova';
import {Auth0ConfigService} from '../auth0Config/Auth0Config.service';
import {BASE_URL, AuthHeaderService} from '../header/auth-header.service';
import {HttpClient} from '@angular/common/http';
import {Injectable, Optional} from '@angular/core';
import {RegState} from './reg-state';
import {Observable} from 'rxjs';
import {BehaviorSubject, Subject} from 'rxjs';
import {PlatformStateService} from '../../state/platform/platform-state.service';
import {REGISTRATION_TYPE} from '../registration-type';
import {RenewalService} from '../renewal/renewal.service';
import {TokenService} from '../token/token.service';
import {RegStateKey} from './reg-state-key';
import {ProfileService} from '../../api/profile/profile.service';

/**
 * Implements much of the State Diagram shown on the
 * Wiki: http://bikehighways.wikidot.com/registration-design.
 */
@Injectable({
  providedIn: 'root'
})
export class RegStateService {

  /* We own the Registration State. */
  public regStateSubject: Subject<RegState>;

  /* Workaround to avoid loading Auth0/Cordova within the browser. */
  private Auth0Cordova;

  constructor(
    public http: HttpClient,
    private auth0ConfigService: Auth0ConfigService,
    private httpService: AuthHeaderService,
    private platformState: PlatformStateService,
    private tokenService: TokenService,
    private renewalService: RenewalService,
    private profileService: ProfileService,
  ) {
    console.log('Hello RegStateProvider Provider');

    /* We use a BehaviorSubject because there are instances where we commit an event prior to returning. */
    this.regStateSubject = new BehaviorSubject<RegState>(
      new RegState(RegStateKey.INITIAL, 'Initial State - waiting to be triggered')
    );

    /* Auth0/Cordova is only brought in against native APIs. */
    if (platformState.isNativeMode()) {
      this.Auth0Cordova = require('@auth0/cordova');
    }
  }

  /**
   * Triggers the top of the Registration State Diagram.
   *
   * This is an entry point for making sure the device is registered
   * and has the access token required to interact with the backend servers.
   *
   * @param urlScheme identifies this application both for the
   * Auth0 client ID and the callback URL.
   * @returns Observable of RegState which tells us the outcome of
   * our device's registration.
   */
  public requestRegState(
    urlScheme: string
  ): Observable<RegState> {

    /* Handles the return to the app after logging in at external site. */
    (window as any).handleOpenURL = (url) => {
      console.log('Callback received -- redirecting via custom scheme: ' + url);
      this.Auth0Cordova.onRedirectUri(url);
    };

    /* Record which client needs registration. */
    this.auth0ConfigService.setUrlScheme(urlScheme);

    if (!this.platformState.isNativeMode()) {
      this.tokenService.bddRegister();
      this.regStateSubject.next(new RegState(RegStateKey.ACTIVE, 'BDD'));
      return this.regStateSubject.asObservable();
    }

    if (this.tokenService.hasAccessToken()) {
      if (this.tokenService.hasAccessTokenExpired()) {
        this.renewalService.renew().subscribe(
          (regState: RegState) => {
            this.regStateSubject.next(regState);
          }
        );
      } else {
        /* We have valid access token. */
        this.regStateSubject.next(
          new RegState(RegStateKey.ACTIVE, 'Access remains valid')
        );
      }
    } else {
      /* Request client to pass control to the Registration Page. */
      this.regStateSubject.next(new RegState(RegStateKey.REGISTRATION_REQUIRED, 'No Tokens'));
    }

    return this.regStateSubject.asObservable();
  }


  /**
   * Called when the user wishes to register via an existing Social Media account.
   */
  public registerSocial() {
    this.register(REGISTRATION_TYPE.SOCIAL);
  }

  /**
   * Called when the user wishes to register using a specific email
   * account to be confirmed via Auth0.
   */
  public registerPasswordless() {
    this.register(REGISTRATION_TYPE.PASSWORDLESS);
  }

  /**
   * Given the type (passwordless or social), invoke the Auth0 3rd-party service
   * to retrieve the following for this device:
   * <ul>
   *     <li>Access Token.
   *     <li>Expiration Timestamp for that token.
   *     <li>Refresh Token for retrieving new Access Token once old one expires.
   *     <li>User Profile so client can cross-check with backend (and provide for confirmation).
   * </ul>
   * @param registrationType as selected by the user.
   */
  private register(registrationType: string) {
    const client = new this.Auth0Cordova(
      this.auth0ConfigService.getConfig(registrationType)
    );
    const options = {
      scope: 'openid profile email offline_access',
      audience: 'https://' + this.auth0ConfigService.getDomain(registrationType) + '/userinfo'
    };

    /**
     * Executes a PKCE to obtain Access Token for this session.
     *
     * Callback against the Custom URL Scheme comes back as the result.
     *
     * @param options tells what we want to retrieve from 3rd-party auth service.
     */
    client.authorize(
      options,
      (error, authResult) => {
        if (error) {
          console.error('During attempt to Authorize:', error);
          throw error;
        }

        console.log('Auth Response: ' + JSON.stringify(authResult));

        this.profileService.fromJwt(authResult.idToken);
        /* Place the details into the Token Service. */
        this.tokenService.unpackAndStorePayload(authResult.idToken);
        this.tokenService.setAccessToken(authResult.accessToken);
        this.tokenService.setRegistrationType(registrationType);
        this.tokenService.setRefreshToken(authResult.refreshToken);
        this.tokenService.setExpiresAtFromPeriod(86400);

        /* Signal we've got a profile that is not yet confirmed. */
        this.regStateSubject.next(new RegState(RegStateKey.CONFIRMATION_REQUIRED, 'Successful 3rd-party Registration'));

      }
    );

  }

  /**
   * User has let us know that their profile is acceptable and that we can proceed to use this profile.
   */
  public confirm(): void {
    /* Update Profile on backend. */
    this.profileService.crossCheckProfile();

    /* We now have a confirmed profile and valid Access Token. */
    this.regStateSubject.next(new RegState(RegStateKey.ACTIVE, 'Freshly Confirmed new Registration'));

  }

  /**
   * User has let us know that they want to retry Registration; tell listeners that we need to register.
   */
  public retry(): void {
    this.regStateSubject.next(new RegState(RegStateKey.REGISTRATION_REQUIRED, 'User-requested Retry'));
  }

  /**
   * Talks to the backend to give it a chance to look at the Auth Headers and tell us if
   * it likes what it sees.
   *
   * TODO: This will probably go into a different service.
   */
  public isRegistered(): Observable<boolean> {
    return this.http.get<boolean>(
      BASE_URL + 'access/state',
      {headers: this.httpService.getAuthHeaders()}
    );
  }

}
