import {Course} from '../course/course';
import {HttpClient} from '@angular/common/http';
import {BASE_URL, HttpService} from '../http/http.service';
import {Injectable} from '@angular/core';
import {from, Observable} from 'rxjs';
import {Path} from './path';
import {map, share} from 'rxjs/operators';

/** Provides and caches Path Geometry and details. */
@Injectable()
export class PathService {

  cachedCourse: Course;
  cachedPathGeoJson: Path[] = [];
  observable: Observable<any>;

  constructor(
    public http: HttpClient,
    private httpService: HttpService,
  ) {
    console.log('Hello PathProvider Provider');
  }

  /**
   * Given the course, load the path information into cache.
   * @param course which has been opened for our session.
   */
  public loadPaths(course: Course) {
    this.cachedCourse = course;
    let index = 0;
    from(course.pathIds)
      .subscribe(
        pathId => {
          this.getPathGeoJson(index, pathId)
            .subscribe();
          index++;
        }
      );
  }

  /**
   * Given the sequenced index for a Path, return the Path instance.
   * @param pathIndex ordered index that progresses with the course.
   */
  public getPathGeoJsonByIndex(pathIndex: number): Path {
    console.log('Retrieving path for index ' + pathIndex);
    return this.cachedPathGeoJson[pathIndex];
  }

  private getPathGeoJson(
    index: number,
    pathId: number
  ): Observable<Path> {
    this.observable = this.http.get<Path>(
      BASE_URL + 'path/geojson/' + pathId,
      {
        headers: this.httpService.getAuthHeaders(),
        observe: 'response'
      }
    ).pipe(
      map(response => {
        this.observable = null;
        if (response.status === 200) {
          this.cachedPathGeoJson[index] = response.body;
          return response.body;
        } else {
          return 'Request failed with status ' + response.status;
        }
      }),
      share()
    );
    return this.observable;
  }

}
