import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {BASE_URL, HttpService} from '../http/http.service';
import {BadgeProgress} from './badge-progress';
import {Observable} from 'rxjs';

/**
 * Provides access to BadgeProgress instances for this session.
 */
@Injectable()
export class BadgeProgressService {

  constructor(
    private http: HttpClient,
    private httpService: HttpService,
  ) {
    console.log('Hello BadgeProgressService Provider');
  }

  public getProgressChips(): Observable<BadgeProgress[]> {
    return this.http.get<BadgeProgress[]>(
      BASE_URL + 'badge/progress',
      {headers: this.httpService.getAuthHeaders()}
    );
  }

}
