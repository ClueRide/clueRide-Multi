import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {
  Observable,
  ReplaySubject,
  Subject
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

  private memberSubject: Subject<Member>;

  constructor(
    public http: HttpClient,
    private authHeaderService: AuthHeaderService,
    private tokenService: TokenService,
  ) {
    console.log('ProfileService: Constructing');
    this.memberSubject = new ReplaySubject<Member>(1);
    this.observable = this.memberSubject.asObservable();
  }

  /**
   * Client's call this to obtain the session's profile/Member record.
   *
   * Triggers call to back-end if we haven't done so already. Otherwise,
   * we let clients ask the ReplaySubject to give them what had been
   * received earlier.
   *
   * ReplaySubject won't have anything to give out until we get something
   * from the back-end, so we return the observable in all cases.
   *
   * This depends on an Active Access Token; making this call after we
   * have Active Access avoids this throwing an error when it calls the
   * back-end.
   */
  public loadMemberProfile(): Observable<Member> {
    if (!this.cachedMember) {
      console.log('Requesting back-end for the Active Member profile');
      this.http.get<Member>(
        BASE_URL + 'member/active',
        {
          headers: this.authHeaderService.getAuthHeaders(),
          observe: 'response'
        },
      ).pipe(
        map( response => {
          /* Reset this to indicate response is received. */
          if (response.status === 200) {
            this.cachedMember = response.body as Member;
            console.log('Logged in as ' + this.cachedMember.displayName);
            console.log('Email ' + this.cachedMember.email);
            console.log('Email Address ' + this.cachedMember.emailAddress);
            console.log('getPrincipal() ' + this.getPrincipal());
            this.memberSubject.next(this.cachedMember);
            return this.cachedMember;
          } else {
            return 'Request failed with status ' + response.status;
          }
        }),
        share()
      ).subscribe();
    }
    return this.observable;
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
    const member = new Member();
    member.displayName = jwtProfile.name;
    member.firstName = jwtProfile.given_name;
    member.lastName = jwtProfile.family_name;
    member.email = jwtProfile.email;
    member.emailAddress = jwtProfile.email;
    member.imageUrl = jwtProfile.picture;
    return member;
  }

  /**
   * Principal means Email Address, but it may be stored in a couple of different fields.
   *
   * This returns what is in the cachedMember instance picked up from the back-end.
   */
  public getPrincipal(): string {
    if (this.cachedMember) {
      if (this.cachedMember.email && this.cachedMember.email.length > 0) {
        return this.cachedMember.email;
      } else if (this.cachedMember.emailAddress) {
        return this.cachedMember.emailAddress;
      }
    }
    return 'unknown';
  }

  public getBadgeOsId(): number {
    if (this.cachedMember) {
      return this.cachedMember.badgeOSId;
    } else {
      return -1;
    }
  }

  public getGivenName(): string {
    if (this.cachedMember) {
      return this.cachedMember.lastName;
    }
    return '';
  }

  public getDisplayName(): string {
    if (this.cachedMember) {
      return this.cachedMember.displayName;
    }
    return '';
  }

  public getUserImageUrl(): string {
    if (this.cachedMember) {
      return this.cachedMember.imageUrl;
    }
    return '';
  }

  /* Provides the ID of the profile, the Member ID. */
  public getCurrentMemberId() {
    return this.cachedMember.id;
  }

  // TODO: FEC-57 Implement this and return an Observable.
  public crossCheckProfile(): void {
      console.log('Talking to the backend to crosscheck the User Profile');
  }

}



