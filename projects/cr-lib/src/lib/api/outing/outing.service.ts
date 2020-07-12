import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {
  AuthHeaderService,
  BASE_URL
} from '../../auth/header/auth-header.service';
import {
  Observable,
  of
} from 'rxjs';
import {Outing} from './outing';
import {
  map,
  share
} from 'rxjs/operators';

/**
 * Service for retrieving Outing Details.
 */
@Injectable({
  providedIn: 'root'
})
export class OutingService {

  /* Defined once we have received valid data and we haven't been asked to refresh. */
  private cachedOuting: Outing;
  /* Defined only during the async window after request and before response. */
  private observable: Observable<any>;

  constructor(
    public http: HttpClient,
    private authHeaderService: AuthHeaderService,
  ) {
    console.log("Hello OutingService");
  }

  public getSessionOuting(): Observable<Outing> {
    if (this.cachedOuting) {
      return of(this.cachedOuting);
    } else if (this.observable) {
      return this.observable;
    } else {
      this.observable = this.http.get(
        BASE_URL + 'outing/active',
        {
          headers: this.authHeaderService.getAuthHeaders(),
          observe: 'response'
        }
      ).pipe(
        map(response => {
          /* Reset this to indicate response is received. */
          this.observable = null;
          if (response.status === 200) {
            this.cachedOuting = response.body as Outing;
            return this.cachedOuting;
          } else {
            console.error("No outing for this session");
            return 'Request failed with status ' + response.status;
          }
        }),
        share()
      );
      return this.observable;
    }
  }

  public get(id: number): Observable<Outing> {
    return this.http.get<Outing> (
      BASE_URL + 'outing/view/' + id,
      {headers: this.authHeaderService.getAuthHeaders()}
    );
  }

  getStartingLocationId() {
    if (this.cachedOuting) {
      return this.cachedOuting.startingLocationId;
    } else {
      return -1;
    }
  }

  getGuideMemberId() {
    if (this.cachedOuting) {
      return this.cachedOuting.guideMemberId;
    } else {
      return undefined;
    }
  }

}
