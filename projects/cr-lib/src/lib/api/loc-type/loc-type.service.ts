import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {
  from,
  Observable,
  Subject
} from 'rxjs';
import {
  AuthHeaderService,
  BASE_URL
} from '../../auth/header/auth-header.service';
import {CategoryService} from '../category/category.service';
import {LocationType} from './loc-type';

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
    private categoryService: CategoryService,
  ) {
    /* Reserve an empty array for each of the known Categories. */
    // TODO: Not sure why this doesn't execute prior to the initializeCache call.
    // this.categoryService.getAllCategories().subscribe(
    from([1, 4, 5, 6, 7, 8, 10]).subscribe(
      (category) => {
        // this.locTypeByCategory[category.id] = [];
        this.locTypeByCategory[category] = [];
      }
    );
  }

  /**
   * Builds cached map of LocationTypeID -> LocationType from resource, but
   * only if we haven't already populated the cache.
   */
  public initializeCache(): Observable<boolean> {
    const cacheFilledSubject: Subject<boolean> = new Subject<boolean>();

    if (LocTypeService.locationTypeCache.length === 0) {
      this.http.get<LocationType[]>(
        BASE_URL + 'location/types',
        {headers: this.httpService.getAuthHeaders()}
      ).subscribe(
        (response) =>  {
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
          cacheFilledSubject.next(true);
        }
      );
    } else {
      cacheFilledSubject.next(true);
    }

    return cacheFilledSubject.asObservable();
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
