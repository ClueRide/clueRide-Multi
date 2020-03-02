import {from} from 'rxjs';
import {isUndefined} from 'util';
import {LocTypeMock} from '../../loc-type/loc-type-mock';
import {AttractionMock} from '../attraction-mock';
import {AttractionsByCategory} from './attractions-by-category';

export class AttractionsByCategoryMock {
  /**
   * Creates a mock Category Map based on the Mock Set of attractions
   * created by the AttractionMock.
   */
  static createAttractionsByCategoryMock(): AttractionsByCategory {
    const attractionsByCategory: AttractionsByCategory = {};
    const locationTypes = LocTypeMock.createLocTypeSet();

    from(AttractionMock.createAttractionMockSet()).subscribe(
      (attraction) => {
        attraction.locationType = locationTypes[attraction.locationTypeId - 1];
        const categoryId = attraction.locationType.category.id;

        /* define empty array if we haven't seen this category yet. */
        if (isUndefined(attractionsByCategory[categoryId])) {
          attractionsByCategory[categoryId] = [];
        }
        attractionsByCategory[categoryId].push(attraction);
      });

    return attractionsByCategory;
  }

}
