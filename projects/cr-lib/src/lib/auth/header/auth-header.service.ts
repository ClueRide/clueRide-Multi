import {HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {TokenService} from '../token/token.service';

/**
 * Provides utility constructs for HttpClient calls.
 */
export const BASE_URL = 'https://player.clueride.com/rest/';
export const SSE_EVENT_BASE_URL = 'http://sse.clueride.com/';

@Injectable({
  providedIn: 'root'
})
export class AuthHeaderService {

  constructor(
    private tokenService: TokenService,
  ) {
    console.log('Hello AuthHeaderService Provider');
  }

  public getAuthHeaders(): HttpHeaders {
    return new HttpHeaders()
      .append(
        'Authorization',
        'Bearer ' + this.tokenService.getBearerToken()
      );
  }

}
