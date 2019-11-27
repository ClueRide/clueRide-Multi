import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BASE_URL, AuthHeaderService} from '../../auth/header/auth-header.service';
import {Badge} from './badge';
import {Observable} from 'rxjs';

/** Provides access to Badges by session. */
@Injectable({
  providedIn: 'root'
})
export class BadgeService {

  constructor(
    public http: HttpClient,
    private httpService: AuthHeaderService,
  ) {
    console.log('Hello BadgeService Provider');
  }

  public getList(): Observable<Badge[]> {
    return this.http.get<Badge[]>(
      BASE_URL + 'badge',
      {headers: this.httpService.getAuthHeaders()}
    );
  }

}
