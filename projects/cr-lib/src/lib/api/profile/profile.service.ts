import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {
  Observable,
  of
} from 'rxjs';
import {
  map,
  share
} from 'rxjs/operators';
import {
  AuthHeaderService,
  BASE_URL
} from '../../auth/header/auth-header.service';
import {TokenService} from '../../auth/token/token.service';
import {Member} from '../member/member';

/**
 * Responsible for the Member's Profile.
 *
 * Initially, this comes from a JWT token and is used to present the profile to the
 * user for confirmation. Once confirmed, the profile can be cross-checked with the
 * backend -- once the corresponding *active* Access Token has been established with
 * the backend.
 */
@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  /* Defined once we have received valid data and we haven't been asked to refresh. */
  private cachedMember: Member;
  /* Defined only during the async window after request and before response. */
  private observable: Observable<any>;

  private member: Member = {
    id: null,
    displayName: 'loading ...',
    firstName: '',
    lastName: '',
    phone: '',
    imageUrl: '',
    email: '',
    emailAddress: '',
    badgeOSId: null,
  };

  constructor(
    public http: HttpClient,
    private authHeaderService: AuthHeaderService,
    private tokenService: TokenService,
  ) {
  }

  /**
   * Client's call this to obtain the session's profile for caching.
   *
   * This depends on an Active Access Token.
   */
  public loadMemberProfile(): Observable<Member> {
    if (this.cachedMember) {
      return of(this.member);
    } else if (this.observable) {
      return this.observable;
    } else {
      this.observable = this.http.get<Member>(
        BASE_URL + 'member/active',
        {
          headers: this.authHeaderService.getAuthHeaders(),
          observe: 'response'
        },
      ).pipe(
        map( response => {
          /* Reset this to indicate response is received. */
          this.observable = null;
          if (response.status === 200) {
            this.cachedMember = response.body as Member;
            console.log('Logged in as ' + this.member.displayName);
            console.log('Email ' + this.member.email);
            console.log('Email Address ' + this.member.emailAddress);
            console.log('getPrincipal() ' + this.getPrincipal());
            return this.cachedMember;
          } else {
            return 'Request failed with status ' + response.status;
          }
        }),
        share()
      );
      return this.observable;
    }
  }

  /**
   * Retrieves a Member representation of the currently recorded jwtToken.
   */
  public getMemberFromToken(): Member {
    return this.fromJwt(
      TokenService.getJwtToken()
    );
  }
  /**
   * Turns a JWT-based token from 3rd-party auth service into our Member representation.
   *
   * @param jwtToken that comes from our 3rd-party auth service.
   */
  public fromJwt(jwtToken: string): Member {
    const jwtProfile = this.tokenService.decodePayload(jwtToken);
    this.member = new Member();
    this.member.displayName = jwtProfile.name;
    this.member.firstName = jwtProfile.given_name;
    this.member.lastName = jwtProfile.family_name;
    this.member.email = jwtProfile.email;
    this.member.emailAddress = jwtProfile.email;
    this.member.imageUrl = jwtProfile.picture;
    return this.member;
  }

  public getPrincipal(): string {
    if (this.member) {
      if (this.member.email && this.member.email.length > 0) {
        return this.member.email;
      } else if (this.member.emailAddress) {
        return this.member.emailAddress;
      }
    }
    return '';
  }

  public getBadgeOsId(): number {
    if (this.member) {
      return this.member.badgeOSId;
    } else {
      return -1;
    }
  }

  public getGivenName(): string {
    if (this.member) {
      return this.member.lastName;
    }
    return '';
  }

  public getDisplayName(): string {
    if (this.member) {
      return this.member.displayName;
    }
    return '';
  }

  public getUserImageUrl(): string {
    if (this.member) {
      return this.member.imageUrl;
    }
    return '';
  }

  /* Provides the ID of the profile, the Member ID. */
  public getCurrentMemberId() {
    return this.member.id;
  }

  // TODO: FEC-57 Implement this and return an Observable.
  public crossCheckProfile(): void {
      console.log('Talking to the backend to crosscheck the User Profile');
  }

}



