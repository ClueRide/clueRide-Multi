import {Injectable} from '@angular/core';
import {STORAGE_KEYS} from '../storage-keys';
import {BddMockToken} from './bddMockToken';
import {REGISTRATION_TYPE} from '../registration-type';

/* Period within which we renew an expiring token in milliseconds. */
export const EXPIRATION_GRACE_MILLIS: number = 4 * 3600 * 1000;

/**
 * Provides functionality for working with the app's JWT token
 * that was obtained using the AuthService and stored locally.
 */
@Injectable({
  providedIn: 'root'
})
export class TokenService {

  payload;
  token: string;

  constructor(
  ) {
    this.payload = JSON.parse(
      window.localStorage.getItem(STORAGE_KEYS.profile)
    );
  }

  /** Taps local storage to retrieve previously saved JWT token. */
  static getJwtToken(): string {
    return window.localStorage.getItem(
      STORAGE_KEYS.jwtToken
    );
  }

  /**
   * Retrieves the token to be presented whenever restricted resources are requested.
   * @returns string representing the token we present to all back-end calls.
   */
  static getBearerToken(): string {
    return JSON.parse(window.localStorage.getItem(STORAGE_KEYS.accessToken));
  }

  /**
   * Returns 'true' if we have a non-empty access token.
   */
  public hasAccessToken(): boolean {
    const token = window.localStorage.getItem(STORAGE_KEYS.accessToken);
    return (token && token.length > 0);
  }

  /**
   * Checks the expiration timestamp (less grace period) to tell if it is time to renew the access token.
   */
  public hasAccessTokenExpired(): boolean {
    return this.willExpireWithinGracePeriod();
  }

  decodePayload(fullToken: string): any {
    if (!fullToken) {
      throw new Error('passed token is not populated');
    }
    const parts = fullToken.split('.');
    if (parts.length !== 3) {
      throw new Error('JWT must have 3 parts');
    }
    /* throws exception if problem decoding. */
    const decoded = atob(parts[1]);
    return JSON.parse(decoded);
  }

  /**
   * When given 'expires_in' instead of 'expires_at', we calculate the expiration time based on adding the
   * given value to the current time.
   *
   * Grace period should avoid the delay in milliseconds between receiving the value and when we attempt to renew.
   *
   * @param expirationPeriodInSeconds represents the number of seconds before our stored values expire (less
   * the grace period).
   */
  setExpiresAtFromPeriod(expirationPeriodInSeconds: number): void {
    const expiresAt = Date.now() + (1000 * expirationPeriodInSeconds);
    this.setStorageVariable(
      STORAGE_KEYS.expiresAt,
      JSON.stringify(expiresAt)
    );
  }

  getRefreshToken(): string {
    return window.localStorage.getItem(
      STORAGE_KEYS.refreshToken
    );
  }

  setRefreshToken(refreshToken: string): void {
    window.localStorage.setItem(
      STORAGE_KEYS.refreshToken,
      refreshToken
    );
  }

  /**
   * Removes all credential information from the Store.
   */
  public clearToken() {
    window.localStorage.removeItem(STORAGE_KEYS.profile);
    window.localStorage.removeItem(STORAGE_KEYS.accessToken);
    window.localStorage.removeItem(STORAGE_KEYS.jwtToken);
    window.localStorage.removeItem(STORAGE_KEYS.expiresAt);
    window.localStorage.removeItem(STORAGE_KEYS.registrationType);
  }

  public getExpiresAtMilliseconds(): number {
    return JSON.parse(window.localStorage.getItem(STORAGE_KEYS.expiresAt));
  }

  private setStorageVariable(name, data) {
    window.localStorage.setItem(name, JSON.stringify(data));
  }

  /**
   * This handles raw profile info (payload) and explicitly
   * pulls the Expiration into a separate value to be stored.
   * The original un-decoded JWT token is also persisted.
   *
   * @param jwtToken the raw un-decoded JWT from the Auth service.
   */
  public unpackAndStorePayload(jwtToken) {
    this.payload = this.decodePayload(jwtToken);
    this.setStorageVariable(
      STORAGE_KEYS.profile,
      this.payload
    );

    this.setStorageVariable(STORAGE_KEYS.jwtToken, jwtToken);
  }

  public setAccessToken(token) {
    this.setStorageVariable(STORAGE_KEYS.accessToken, token);
  }

  public getRegistrationType(): string {
    return JSON.parse(window.localStorage.getItem(STORAGE_KEYS.registrationType));
  }

  public setRegistrationType(registrationType: string) {
    this.setStorageVariable(
      STORAGE_KEYS.registrationType,
      registrationType
    );
  }

  /**
   * Checks expiration Date and returns true if the token has expired.
   *
   * Will recommend renewal if the token is within certain number of hours of needing renewal.
   */
  willExpireWithinGracePeriod(): boolean {
    const now = Date.now();
    return (now + EXPIRATION_GRACE_MILLIS) > this.getExpiresAtMilliseconds();
  }

  /**
   * This function is called when performing BDD testing instead of the
   * regular login which natively calls out to internal browser to
   * retrieve the Auth0 site -- and thus cannot be tested using BDD tools.
   *
   * This simply stuffs a set of tokens where they are expected.
   * Much of the data is based on the JWT token which carries profile data.
   */
  public bddRegister() {
    const bddMockToken: BddMockToken = new BddMockToken();
    /* Record the token we'll use for testing. */
    this.setAccessToken(bddMockToken.accessToken);
    this.setRegistrationType(REGISTRATION_TYPE.SOCIAL);
  }

  hasRefreshToken() {
    return !!this.getRefreshToken();
  }

}
