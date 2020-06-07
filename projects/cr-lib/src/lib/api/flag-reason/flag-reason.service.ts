import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {
  AuthHeaderService,
  BASE_URL
} from '../../auth/header/auth-header.service';
import {Observable} from 'rxjs';
import {FlagReason} from './flag-reason.enum';
import {shareReplay} from 'rxjs/operators';

/**
 * Service support for static FlagReason instances.
 */
@Injectable({
  providedIn: 'root'
})
export class FlagReasonService {

  readonly observable: Observable<FlagReason[]>;

  constructor(
    private http: HttpClient,
    private authHeaderService: AuthHeaderService
  ) {
    console.log('Hello FlagReasonService');
    this.observable = this.http.get<FlagReason[]>(
      BASE_URL + 'flag/reason',
      {headers: this.authHeaderService.getAuthHeaders()}
    ).pipe(
      shareReplay(1)
    );
  }

  /**
   * Retrieves the set of Flag Reasons.
   *
   * Uses RxJS to cache the response from back-end.
   */
  public getFlagReasons(): Observable<FlagReason[]> {
    console.log('FlagReasonService.getFlagReasons()');
    return this.observable;
  }

}
