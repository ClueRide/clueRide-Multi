import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {
  AuthHeaderService,
  BASE_URL
} from '../../auth/header/auth-header.service';
import {Category} from './category';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

/**
 * Service support for Category instances.
 */
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private categories: Category[] = [];
  private categoriesById: {[index: number]: Category} = {};

  constructor(
    public http: HttpClient,
    private authHeaderService: AuthHeaderService
  ) {
    console.log('Hello CategoryService');
  }

  /**
   * Populates the cached copy of the Categories as well as returning the same as an Observable
   * so we know when it completes.
   */
  public load(): Observable<Category[]> {
    console.log('CategoryService.load()');
    return this.http.get<Category[]>(
      BASE_URL + 'category',
      {headers: this.authHeaderService.getAuthHeaders()}
    ).pipe(
      tap (response => {
        response.forEach(category => {
          this.categories.push(category);
          this.categoriesById[category.id] = category;
        });
        console.log('Category Cache filled. total: ' + this.categories.length);
      })
    );
  }

  /**
   * Retrieves full list of Categories from server.
   *
   * This list is cached because it changes slowly.
   */
  public getAllCategories(): Category[] {
    return this.categories;
  }

  /**
   * Given an ID, retrieve the Category identified by that ID.
   *
   * @param id unique identifier for a Category.
   */
  public getCategoryById(id: number): Category {
    return this.categoriesById[id];
  }

}
