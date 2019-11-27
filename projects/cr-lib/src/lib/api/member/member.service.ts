import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {BASE_URL, AuthHeaderService} from '../../auth/header/auth-header.service';
import {Observable} from 'rxjs';
import {Member} from './member';

/**
 * Provides access to the Member Service API.
 */
@Injectable({
  providedIn: 'root'
})
export class MemberService {

  constructor(
    private http: HttpClient,
    private httpService: AuthHeaderService,
  ) {
    console.log('Hello MemberService');
  }

  /**
   * Given the pattern string, return users that match the string.
   * @param pattern to filter the members to be returned.
   */
  fetchMatchingMembers(pattern: string): Observable<Member[]> {
    return this.http.get<Member[]>(
      BASE_URL + 'member/matching?pattern=' + pattern,
      {headers: this.httpService.getAuthHeaders()}
    );
  }

  /**
   * Invoked when the user has confirmed the email address
   * they want to use.
   * This is also a signal that registration is successful.
   * @param member to be cross-checked.
   */
  crossCheckMember(member: Member): Observable<Member> {
    return this.http.post<Member>(
      BASE_URL + 'member/cross-check',
      member,
      {headers: this.httpService.getAuthHeaders()}
    );
  }

}
