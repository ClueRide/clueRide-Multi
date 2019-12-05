import {Injectable} from '@angular/core';
import {AUTH_CONFIG} from './auth0-variables';
import {REGISTRATION_TYPE} from '../registration-type';

const auth0Config = {};

auth0Config[REGISTRATION_TYPE.SOCIAL] = {
  // needed for auth0
  clientID: AUTH_CONFIG.clientID.social,

  // needed for auth0cordova
  clientId: AUTH_CONFIG.clientID.social,
  domain: AUTH_CONFIG.domain.social,
  packageIdentifier: 'com.clueride.client'  // Not obvious that this is used to build callback URL.
};

auth0Config[REGISTRATION_TYPE.PASSWORDLESS] = {
  // needed for auth0
  clientID: AUTH_CONFIG.clientID.passwordless,

  // needed for auth0cordova
  clientId: AUTH_CONFIG.clientID.passwordless,
  domain: AUTH_CONFIG.domain.passwordless,
  packageIdentifier: 'com.clueride.client'  // Not obvious that this is used to build callback URL.
};

/* TODO: I'm not injecting this anywhere? */
@Injectable({
  providedIn: 'root'
})
export class Auth0ConfigService {

  /**
   * Provides the Auth0 Config object used by Auth0Cordova calls.
   * @param registrationType string for either social or email/passwordless.
   */
  getConfig(registrationType: string) {
    return auth0Config[registrationType];
  }

  getDomain(registrationType: string): string {
    return auth0Config[registrationType].domain;
  }

  getClientID(registrationType: string): string {
    return auth0Config[registrationType].clientID;
  }

  /**
   * Set the string by which Callback functions recognize the client app being registered.
   *
   * The callback URL is built from the "packageIdentifier" that is set in the
   * Config object. This is specific to each client and generally would come from the
   * request to provide Registration State.
   *
   * NOTE: the scheme needs to also be configured in the 'customurlscheme' plugin and
   * on the Auth0 website's list of valid callback URLs.
   * @param scheme - matches the client's unique package identifier -- basically, which app is
   * calling Auth0.
   */
  setUrlScheme(scheme: string): void {
    auth0Config[REGISTRATION_TYPE.SOCIAL].packageIdentifier = scheme;
    auth0Config[REGISTRATION_TYPE.PASSWORDLESS].packageIdentifier = scheme;
  }

}
