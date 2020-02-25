import {Attraction} from './attraction';

/**
 * Defines how we map an Attraction's ID to its instance.
 */
export interface AttractionMap {
  [index: number]: Attraction;
}

