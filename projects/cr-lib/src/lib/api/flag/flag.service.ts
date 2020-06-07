import {Injectable} from '@angular/core';
import {Flag} from './flag';
import {Observable} from 'rxjs';
import {
  AuthHeaderService,
  BASE_URL
} from '../../auth/header/auth-header.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FlagService {

  constructor(
    private http: HttpClient,
    private httpService: AuthHeaderService,
) { }

  /**
   * Sends flag to the database to be created.
   *
   * @param flag instance to be persisted.
   */
  addFlag(flag: Flag): Observable<Flag> {
    return this.http.post<Flag>(
      BASE_URL + 'flag',
      flag,
      {headers: this.httpService.getAuthHeaders()}
    );
  }

}
