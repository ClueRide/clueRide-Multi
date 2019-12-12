import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AuthHeaderService, BASE_URL} from '../../auth/header/auth-header.service';
import {LocLink} from './loc-link';

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
