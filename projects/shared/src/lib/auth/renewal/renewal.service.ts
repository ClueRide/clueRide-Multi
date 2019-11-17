import {Observable, Subject} from 'rxjs';
import {RegState} from '../../state/reg/reg-state';
import {Injectable} from '@angular/core';
import {TokenService} from '../token/token.service';
import {Auth0ConfigService} from '../auth0Config/Auth0ConfigService';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {RegStateKey} from '../../state/reg/reg-state-key';

@Injectable()
export class RenewalService {

  /* If we're renewing, we won't be changing the registration type. */
  readonly registrationType: string;
  readonly postBody;

  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
    private auth0ConfigService: Auth0ConfigService,
  ) {
    this.registrationType = this.tokenService.getRegistrationType();
    // tslint:disable-next-line:no-console
    console.debug('Renewing for Registration Type: ', this.registrationType);
    this.postBody = {
      grant_type: 'refresh_token',
      client_id: this.auth0ConfigService.getClientID(this.registrationType),
      refresh_token: this.tokenService.getRefreshToken(),
    };
  }

  /**
   * Kicks off a Renewal request to Auth0 and prepares to return the result into
   * a RegState observable.
   *
   * The event is returned once this function has placed the renewed tokens into storage.
   *
   * Notes from https://auth0.com/docs/tokens/refresh-token/current
   * suggest that we'll be making a regular HTTP request and won't need
   * to use the Auth0Cordova client.
   */
  public renew(): Observable<RegState> {
    console.log('Renewing expired token');
    const subscription = new Subject<RegState>();

    this.http.post(
      'https://' + this.auth0ConfigService.getDomain(this.registrationType) + '/oauth/token',
      this.postBody,
      {headers:
        new HttpHeaders().append('content-type', 'application/json')
      }
    ).subscribe(
      (renewResponse: any) => {
        console.log('Picked up new Access Token');
        /* NOTE: these property names use snake_case instead of camelCase. */
        this.tokenService.unpackAndStorePayload(renewResponse.id_token);
        this.tokenService.setExpiresAtFromPeriod(renewResponse.expires_in);
        this.tokenService.setAccessToken(renewResponse.access_token);
        subscription.next(new RegState(RegStateKey.ACTIVE, 'Renewed'));
      }
    );

    return subscription.asObservable();
  }

}
