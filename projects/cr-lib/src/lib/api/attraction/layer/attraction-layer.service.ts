import {Injectable} from '@angular/core';
import * as L from 'leaflet';
import {
  Observable,
  ReplaySubject,
  Subject
} from 'rxjs';
import {Filter} from '../../../filter/filter';
import {ClickableMarker} from '../../../marker/clickableMarker';
import {PoolMarkerService} from '../../../marker/pool/pool-marker.service';
import {CategoryService} from '../../category/category.service';
import {AttractionsByCategory} from '../category/attractions-by-category';
import {CategoryAttractionService} from '../category/category-attraction.service';
import {Category} from '../../category/category';
import {Attraction} from '../attraction';

interface LayerPerCategory {
  [index: number]: L.Layer;
}

/**
 * Responsible for the Layers of Attractions that are placed on the Map.
 *
 * It is called when data is loaded, and updated when changes are made.
 *
 * It collaborates with the MapDataService and the Filter to provide
 * ready-to-go layers to turn on/off on the map.
 */
@Injectable({
  providedIn: 'root'
})
export class AttractionLayerService {

  private attractionLayerSubject: Subject<boolean>;
  /* Maps a given Category ID to the Layer which holds the Category's attractions. */
  private layerPerCategory: LayerPerCategory;

  constructor(
    private categoryService: CategoryService,
    private categoryAttractionService: CategoryAttractionService,
    private poolMarkerService: PoolMarkerService,
  ) {
    this.attractionLayerSubject = new ReplaySubject<boolean>(1);
  }

  /**
   * Trigger for when we can load the cache for Attraction Layers.
   */
  loadAttractionLayers(): Observable<boolean> {
    if (this.layerPerCategory) {
      console.log('Layers have already been initialized');
    } else {
      console.log('AttractionLayerService.loadAttractionLayers()');

      this.layerPerCategory = {};

      /* Populate the Categories, if needed. */
      if (this.categoryService.getAllCategories().length == 0) {
        this.categoryService.loadSync();
      }

      this.categoryService.getAllCategories().forEach(
        (category: Category) => {
          console.log('AttractionLayerService.constructor()', category.name);
          this.layerPerCategory[category.id] = new L.LayerGroup();
        }
      );

      /* AttractionLayers don't make any sense until we've got the Categories. */
      this.categoryAttractionService.loadAllAttractions().subscribe(
        () => {
          const attractionsByCategory: AttractionsByCategory = this.categoryAttractionService.getAttractionMap();

          for (const categoryId in attractionsByCategory) {
            if (attractionsByCategory.hasOwnProperty(categoryId)) {
              const attractionsList = attractionsByCategory[categoryId];
              console.log('Category ' + categoryId + ' has ' + attractionsList.length + ' entries');

              attractionsList.forEach(
                (attraction) => {
                  this.addAttractionToLayer(attraction, categoryId);
                }
              );
            }
          }
          this.attractionLayerSubject.next(true);
        }
      );

    }
    return this.attractionLayerSubject.asObservable();
  }

  private addAttractionToLayer(attraction: Attraction, categoryId: string) {
    // TODO CI-160
    /* This creates editable markers; want a different set for display-only. */
    if (attraction.locationType) {
      const marker: ClickableMarker = this.poolMarkerService.getAttractionMarker(attraction);
      this.layerPerCategory[categoryId].addLayer(marker);
    } else {
      console.log('AttractionLayerService: no Location Type for ', attraction.name);
    }
  }

  /**
   * Trigger for turning on or off each Category Layer -- or the Outing Layer.
   *
   * Algorithm is to review list of all Categories against what is currently on or off, and decide
   * if a change needs to be made to that Category, either turning it on or turning it off.
   *
   * @param filter tells us what Categories and Courses should be included.
   * @param map is where we're putting the layers.
   */
  showFilteredAttractions(
    filter: Filter,
    map: L.Map
  ): void {
    /* Problem if we call this without providing the map. */
    if (!map) {
      console.log('Map not provided');
      return;
    }

    console.log('showFilteredAttractions: # of Categories:', this.categoryService.getAllCategories().length);

    if (filter.isEmpty) {
      /* Place all categories on the map. */
      map.clearLayers();
      this.categoryService.getAllCategories().forEach(
        (category: Category) => {
          map.addLayer(this.layerPerCategory[category.id]);
        }
      );
    } else {

      const existingLayers = map.getLayers();
      this.categoryService.getAllCategories().forEach(
        (category) => {
          console.log('Checking category ID ' + category.id);

          /* Only toggle the layer if we have markers for the category. */
          if (this.layerPerCategory[category.id] && this.layerPerCategory[category.id].getLayers().length > 0) {
            const layerTurnedOn = !!existingLayers.includes(this.layerPerCategory[category.id]);
            const filterTurnedOn = !!filter.categoriesToIncludeById.includes(category.id);
            if (layerTurnedOn !== filterTurnedOn) {
              if (filterTurnedOn) {
                console.log('Including category', category.name);
                map.addLayer(this.layerPerCategory[category.id]);
              } else {
                console.log('Removing category', category.name);
                map.removeLayer(this.layerPerCategory[category.id]);
              }
            }
          } else {
            console.log('No markers for Category', category.name);
          }
        }
      );

    }
  }

}
