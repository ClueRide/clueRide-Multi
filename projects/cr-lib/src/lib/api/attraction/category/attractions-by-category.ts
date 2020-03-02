import {Attraction} from '../attraction';

/**
 * Maps Category ID to a list of Attractions that fall within that Category.
 */
export interface AttractionsByCategory {
  [index: number]: Attraction[];
}

