import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {
  AuthHeaderService,
  BASE_URL
} from '../../../auth/header/auth-header.service';
import {LinkPath} from './link-path';
import {Observable} from 'rxjs';
import {Course} from '../../course/course';

@Injectable({
  providedIn: 'root'
})
export class LinkPathService {
  constructor (
    public http: HttpClient,
    private httpService: AuthHeaderService,
  ) {
    console.log('Hello LinkPathService');
  }

  public linkAttractions(course: Course): Observable<LinkPath[]> {
    return this.http.post<LinkPath[]>(
      BASE_URL + 'path/link',
      course,
      { headers: this.httpService.getAuthHeaders() }
    );
  }

}
