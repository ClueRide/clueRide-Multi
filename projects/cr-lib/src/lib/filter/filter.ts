/**
 * Holds criteria for choosing which set of Attractions should be displayed.
 *
 * Prepared by FilterPage (or a similar dialog/popover) and consumed by AttractionLayerService
 * which is responsible for adding them to the map.
 *
 * An empty filter (the default which is initialized below) means to show everything.
 * A filter that isn't supplied -- or a null filter -- also means show everything.
 */

/** Default is to include nothing. */
export class Filter {
  categoriesToIncludeById: number[] = [];
  courseToInclude: number = null;
  isEmpty: boolean = true;
}
