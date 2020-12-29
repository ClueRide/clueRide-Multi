import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Member} from '../member/member';
import {
  AuthHeaderService,
  BASE_URL
} from '../../auth/header/auth-header.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AccessTokenService {

  constructor(
    private authHeaderService: AuthHeaderService,
    private http: HttpClient,
  ) { }

  /**
   * Checks against the back-end that our current token is valid.
   */
  public isTokenValid(): Observable<boolean> {
    return this.http.get<boolean>(
      BASE_URL + 'access/state',
      {headers: this.authHeaderService.getAuthHeaders()}
    );
  }

  /**
   * Persists new profile once user has confirmed the email address they wish to use.
   *
   * This sends the profile obtained from parsing the JWT token so it can be compared
   * to what the AuthHeaders would provide when presented to the 3rd-party Auth service.
   */
  public createNewProfile(member: Member): Observable<Member> {
    console.log('Talking to the backend to create new User Profile');

    return this.http.post<Member>(
      BASE_URL + 'access/state/init',
      member,
      {headers: this.authHeaderService.getAuthHeaders()}
    );
  }

}
