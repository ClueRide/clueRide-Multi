import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {
  AuthHeaderService,
  BASE_URL,
  OutingService,
  ProfileService
} from 'cr-lib';

@Injectable({
  providedIn: 'root'
})
export class GuideEventService {

  constructor(
    public http: HttpClient,
    private profileService: ProfileService,
    private outingService: OutingService,
    private authHeaderService: AuthHeaderService,
  ) {
    console.log('Hello GuideEventService Provider');
  }

  public sendArrival() {
    this.http.post(
      BASE_URL + 'game-state/arrival',
      null,
      {
        headers: this.authHeaderService.getAuthHeaders()
      }
    ).subscribe(
      () => {
        console.log('Arrival Message is Sent');
      }
    );
  }

  public sendDeparture() {
    this.http.post(
      BASE_URL + 'game-state/departure',
      null,
      {
        headers: this.authHeaderService.getAuthHeaders()
      }
    ).subscribe(
      () => {
        console.log('Departure Message is Sent');
      }
    );
  }

  public sendTeamAssembled() {
    this.http.post(
      BASE_URL + 'game-state/team-assembled',
      null,
      {
        headers: this.authHeaderService.getAuthHeaders()
      }
    ).subscribe(
      () => {
        console.log('Team Assembled Message is Sent');
      }
    );
  }

  /* Bases decision on comparison of current Member ID and the Guide's Member ID for the outing. */
  isCurrentMemberGuide() {
    const currentMemberId = this.profileService.getCurrentMemberId();
    const guideMemberId = this.outingService.getGuideMemberId();
    return currentMemberId === guideMemberId;
  }

}

