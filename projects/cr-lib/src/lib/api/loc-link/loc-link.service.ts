import {Injectable} from '@angular/core';
import {BASE_URL, AuthHeaderService} from '../../../../../cr-lib/src/lib/auth/header/auth-header.service';
import {HttpClient} from '@angular/common/http';
import {LocLink} from './loc-link';
import {Observable} from 'rxjs';

/**
 * Provides access to Location Link instances.
 */
@Injectable({
  providedIn: 'root'
})
export class LocLinkService {

  constructor(
    private http: HttpClient,
    private httpService: AuthHeaderService,
  ) {

  }

  /**
   * Sends the given Loc Link to the back-end to create a new
   * record for the instance.
   *
   * @param locLink contains text link, but record ID is provided by the back-end.
   */
  public addNewLocLink(locLink: LocLink): Observable<LocLink> {
    return this.http.post<LocLink>(
      BASE_URL + 'locLink',
      locLink,
      {headers: this.httpService.getAuthHeaders()}
    );
  }

}
