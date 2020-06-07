import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {
  AuthHeaderService,
  BASE_URL
} from '../../auth/header/auth-header.service';
import {Observable} from 'rxjs';
import {FlaggedAttribute} from './flagged-attribute.enum';
import {shareReplay} from 'rxjs/operators';

/**
 * Service support for static FlaggedAttribute instances.
 */
@Injectable({
  providedIn: 'root'
})
export class FlaggedAttributeService {

  readonly observable: Observable<FlaggedAttribute[]>;

  constructor(
    public http: HttpClient,
    private authHeaderService: AuthHeaderService
  ) {
    console.log('Hello FlaggedAttributeService');
    this.observable = this.http.get<FlaggedAttribute[]>(
      BASE_URL + 'flag/attribute',
      {headers: this.authHeaderService.getAuthHeaders()}
    ).pipe(
      shareReplay(1)
    );
  }

  /**
   * Populates the cached copy of the FlagReasons as well as returning the same as an Observable
   * so we know when it completes.
   */
  public getFlaggedAttributes(): Observable<FlaggedAttribute[]> {
    console.log('FlaggedAttributeService.getFlaggedAttributes()');
    return this.observable;
  }

}
