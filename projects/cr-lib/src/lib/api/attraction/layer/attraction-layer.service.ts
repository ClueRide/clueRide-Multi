import {Injectable} from '@angular/core';
import * as L from 'leaflet';
import {
  Observable,
  of,
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
import {BoundsService} from '../bounds/bounds-service';

interface LayerPerCategory {
  [index: number]: L.LayerGroup;
}

interface LayerIdPerAttractionId {
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

  /* Records the AttractionID to Leaflet's LayerID mapping. */
  private layerIdPerAttractionId: LayerIdPerAttractionId = [];

  constructor(
    private boundsService: BoundsService,
    private categoryService: CategoryService,
    private categoryAttractionService: CategoryAttractionService,
    private poolMarkerService: PoolMarkerService,
  ) {
    this.attractionLayerSubject = new ReplaySubject<boolean>(1);
  }

  /**
   * Trigger for when we can load the cache for Attraction Layers.
   *
   * This expects that a separate set of calls has initialized the dependent services:
   * CategoryService to provide the list of Categories (stable throughout a session).
   * CategoryAttractionService to provide the list of Attractions (changes for Ranger, stable for Seeker).
   * PoolMarkerService to create the markers (no need to be initialized).
   */
  loadAttractionLayers(): Observable<boolean> {
    console.log('AttractionLayerService.loadAttractionLayers()');

    /* AttractionLayers don't make any sense if we have no Categories. */
    const allCategories = this.categoryService.getAllCategories();
    if (allCategories.length === 0) {
      return of(false);
    }

    this.layerPerCategory = {};

    allCategories.forEach(
      (category: Category) => {
        console.log('AttractionLayerService.loadAttractionLayers()', category.name);
        this.layerPerCategory[category.id] = new L.LayerGroup();
      }
    );

    const attractionsByCategory: AttractionsByCategory = this.categoryAttractionService.getAttractionMap();

    for (const categoryId in attractionsByCategory) {
      if (attractionsByCategory.hasOwnProperty(categoryId)) {
        const attractionsList = attractionsByCategory[categoryId];
        console.log('Category ' + categoryId + ' has ' + attractionsList.length + ' entries');

        attractionsList.forEach(
          (attraction) => this.addAttractionToLayer(attraction, categoryId)
        );
      }
    }
    return of(true);
  }

  private addAttractionToLayer(attraction: Attraction, categoryId: string) {
    // TODO CI-160
    /* This creates editable markers; want a different set for display-only. */
    const marker: ClickableMarker = this.poolMarkerService.getAttractionMarker(attraction);

    /* Record the leaflet layer ID for later use updating the layer. */
    this.layerIdPerAttractionId[attraction.id] = marker;
    this.layerPerCategory[categoryId].addLayer(marker);
  }

  /**
   * When creating a brand new attraction, add it to the Uncategorized Layer until
   * we are given a specific layer.
   *
   * @param attraction newly created instance.
   */
  public addNewAttraction(attraction: Attraction): void {
    this.addAttractionToLayer(attraction, '0');
  }

  public updateAttraction(attraction: Attraction): void {
    this.addAttractionToLayer(attraction, '' + this.categoryAttractionService.getCategoryIdForAttraction(attraction));
  }

  /**
   * Given an attraction to be deleted, remove it from the layer where it resides.
   * Removal from the layer also removes it from being viewed or clicked on the map.
   *
   * CategoryAttractionService was the source, but it's not clear it needs to be
   * updated with deletions.
   *
   * @param attraction to be deleted from map layers.
   */
  public deleteAttraction(attraction: Attraction) {
    /* Assigns zero (UNCATEGORIZED) if there is no category assignment. */
    const categoryId = this.categoryAttractionService.getCategoryIdForAttraction(attraction);

    /* Remove the attraction's marker layer from the category's layerGroup. */
    const layerId = this.layerIdPerAttractionId[attraction.id];
    if (this.layerPerCategory[categoryId].hasLayer(layerId)) {
      console.log('Found layer to remove');
      this.layerPerCategory[categoryId].removeLayer(layerId);
    } else {
      console.log('Layer to remove is not found');
    }
  }

  /**
   * Trigger for turning on or off each Category Layer -- or the Outing Layer.
   *
   * Algorithm is to review list of all Categories against what is currently on or off, and decide
   * if a change needs to be made to that Category, either turning it on or turning it off.
   *
   * @param filter tells us what Categories and Courses should be included.
   * @param layerGroup is where we're putting the layers.
   */
  showFilteredAttractions(
    filter: Filter,
    layerGroup: L.LayerGroup
  ): void {
    /* Problem if we call this without providing the map. */
    if (!layerGroup) {
      console.log('Map not provided');
      return;
    }

    console.log('showFilteredAttractions: # of Categories:', this.categoryService.getAllCategories().length);

    if (filter.isEmpty) {
      /* Place all categories on the map. */
      layerGroup.clearLayers();
      this.categoryService.getAllCategories().forEach(
        (category: Category) => {
          layerGroup.addLayer(this.layerPerCategory[category.id]);
        }
      );
    } else {
      /* Check if we will be setting the bounds based on a single category. */
      if (filter.categoriesToIncludeById.length === 1) {
        let singleCategoryId = filter.categoriesToIncludeById[0];

        this.boundsService.setNewBounds(
          this.categoryAttractionService.getAttractionsByCategory(singleCategoryId)
        );
      }

      const existingLayers = layerGroup.getLayers();
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
                layerGroup.addLayer(this.layerPerCategory[category.id]);
              } else {
                console.log('Removing category', category.name);
                layerGroup.removeLayer(this.layerPerCategory[category.id]);
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
