import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {
  AuthHeaderService,
  BASE_URL
} from '../../../auth/header/auth-header.service';
import {PathMeta} from './path-meta';
import {Observable} from 'rxjs';
import {Course} from '../../course/course';

@Injectable({
  providedIn: 'root'
})
export class PathMetaService {
  constructor (
    public http: HttpClient,
    private httpService: AuthHeaderService,
  ) {
    console.log('Hello PathMetaService');
  }

  /**
   * This establishes a set of Path records -- perhaps without Edges on those Paths --
   * that connect each of the ordered pairs of attractions contained within the given course.
   * @param course instance containing the ordered list of attractions.
   */
  public linkAttractions(course: Course): Observable<PathMeta[]> {
    return this.http.post<PathMeta[]>(
      BASE_URL + 'path/meta',
      course,
      { headers: this.httpService.getAuthHeaders() }
    );
  }

}
