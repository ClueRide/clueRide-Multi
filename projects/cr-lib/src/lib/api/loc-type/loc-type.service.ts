import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {
  AuthHeaderService,
  BASE_URL
} from '../../auth/header/auth-header.service';
import {LocationType} from './loc-type';
import {Category} from '../category/category';
import {tap} from 'rxjs/operators';

interface LocTypeCategoryMap {
  [index: number]: LocationType[];
}

@Injectable({
  providedIn: 'root'
})
export class LocTypeService {

  static locationTypeCache: LocationType[] = [];
  private locTypeByCategory: LocTypeCategoryMap = {};

  constructor(
    public http: HttpClient,
    private httpService: AuthHeaderService,
  ) {
  }

  /**
   * Loads cached map of LocationTypeID -> LocationType from resource and
   * returns as an Observable so we know when this completes.
   */
  public load(categories: Category[]): Observable<LocationType[]> {
    /* Reserve an empty array for each of the known Categories. */
    categories.forEach(
      (category) => this.locTypeByCategory[category.id] = []
    );

    return this.http.get<LocationType[]>(
      BASE_URL + 'location/types',
      {headers: this.httpService.getAuthHeaders()}
    ).pipe(
      tap((response) =>  {
        response.forEach(locType => {
          LocTypeService.locationTypeCache[locType.id] = locType;
          console.log('LocTypeService: classifying', locType.name);
          if (locType.category) {
            this.locTypeByCategory[locType.category.id].push(locType);
          } else {
            console.log('Location Type ' + locType.name + ' has no category assigned');
          }
        });
        console.log('Loc Type Cache filled. total: ' + LocTypeService.locationTypeCache.length);
      })
    );

  }

  public allLocationTypes(): Array<LocationType> {
    return LocTypeService.locationTypeCache;
  }

  public getById(id: number): LocationType {
    return LocTypeService.locationTypeCache[id];
  }

  public getByCategoryId(id: number): LocationType[] {
    if (!id) { return ([]); }
    return this.locTypeByCategory[id];
  }

}
