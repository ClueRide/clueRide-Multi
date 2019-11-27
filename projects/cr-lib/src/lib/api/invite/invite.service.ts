import {Injectable} from '@angular/core';
import {Invite} from './invite';
import {HttpClient} from '@angular/common/http';
import {BASE_URL, AuthHeaderService} from '../../auth/header/auth-header.service';
import {Observable} from 'rxjs';
import {SessionInviteState} from './sessionInviteState';


@Injectable({
  providedIn: 'root'
})
export class InviteService {

  constructor(
    private http: HttpClient,
    private httpService: AuthHeaderService,
  ) {
  }

  /** Returns a string representing the state of invites for the current session. */
  public inviteState(): Observable<keyof typeof SessionInviteState> {
    return this.http.get<keyof typeof SessionInviteState>(
      BASE_URL + 'invite/current-state',
      {headers: this.httpService.getAuthHeaders()}
    );
  }

  /** Retrieves an ordered list of Invites for the current session. */
  myInvites(): Observable<Invite[]> {
    return this.http.get<Invite[]>(
      BASE_URL + 'invite',
      {headers: this.httpService.getAuthHeaders()}
    );
  }

  /** For the provided invite, tells the server the client is accepting the invite. */
  accept(inviteId: number): Observable<Invite> {
    return this.http.post<Invite>(
      BASE_URL + 'invite/accept/' + inviteId,
      {},
      {headers: this.httpService.getAuthHeaders()}
    );
  }

  /** For the provided invite, tells the server the client is declining the invite. */
  decline(inviteId: number): Observable<Invite> {
    return this.http.post<Invite>(
      BASE_URL + 'invite/decline/' + inviteId,
      {},
      {headers: this.httpService.getAuthHeaders()}
    );
  }

  // TODO: endpoints supporting the maintenance of Invites

}
