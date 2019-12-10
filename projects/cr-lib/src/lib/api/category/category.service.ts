import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Category} from './category';

/**
 * Service support for Category instances.
 */
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  category: Category;

  constructor(public http: HttpClient) {
    console.log('Hello CategoryService');
  }

}
