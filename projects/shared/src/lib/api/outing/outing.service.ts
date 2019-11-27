import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BASE_URL, AuthHeaderService} from '../../../../../cr-lib/src/lib/auth/header/auth-header.service';
import {Observable, of} from 'rxjs';
import {OutingView} from './outing-view';
import {map, share} from 'rxjs/operators';

/**
 * Service for retrieving Outing Details.
 */
@Injectable()
export class OutingService {

  /* Defined once we have received valid data and we haven't been asked to refresh. */
  private cachedOuting: OutingView;
  /* Defined only during the async window after request and before response. */
  private observable: Observable<any>;

  constructor(
    public http: HttpClient,
    private httpService: AuthHeaderService,
  ) {
  }

  public getSessionOuting(): Observable<OutingView> {
    if (this.cachedOuting) {
      return of(this.cachedOuting);
    } else if (this.observable) {
      return this.observable;
    } else {
      this.observable = this.http.get(
        BASE_URL + 'outing/active',
        {
          headers: this.httpService.getAuthHeaders(),
          observe: 'response'
        }
      ).pipe(
        map(response => {
          /* Reset this to indicate response is received. */
          this.observable = null;
          if (response.status === 200) {
            this.cachedOuting = response.body as OutingView;
            return this.cachedOuting;
          } else {
            return 'Request failed with status ' + response.status;
          }
        }),
        share()
      );
      return this.observable;
    }
  }

  public get(id: number): Observable<OutingView> {
    return this.http.get<OutingView> (
      BASE_URL + 'outing/view/' + id,
      {headers: this.httpService.getAuthHeaders()}
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
