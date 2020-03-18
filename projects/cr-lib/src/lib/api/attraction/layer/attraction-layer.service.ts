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

interface LayerPerCategory {
  [index: number]: L.Layer;
}

@Injectable({
  providedIn: 'root'
})
export class AttractionLayerService {

  private attractionLayerSubject: Subject<boolean>;
  /* Maps a given Category ID to the Layer which holds the Category's attractions; readonly to allow testing. */
  readonly layerPerCategory: LayerPerCategory = {};

  private mapWithLayers: L.Map;

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
  loadAttractionLayers(map: L.Map): Observable<boolean> {
    if (!map) {
      throw new Error('Map cannot be empty');
    }
    if (this.mapWithLayers) {
      console.log('Layers have already been initialized (and the map too)');
      return this.attractionLayerSubject.asObservable();
    }
    this.mapWithLayers = map;
    this.mapWithLayers.clearLayers();

    /* Map itself is in place; now pickup the Attractions. */
    const attractionsByCategory: AttractionsByCategory = this.categoryAttractionService.getAttractionMap();

    for (const categoryId in attractionsByCategory) {
      if (attractionsByCategory.hasOwnProperty(categoryId)) {
        const attractionsList = attractionsByCategory[categoryId];
        console.log('Category ' + categoryId + ' has ' + attractionsList.length + ' entries');
        this.layerPerCategory[categoryId] = L.layerGroup().addTo(this.mapWithLayers);

        // TODO CI-160
        /* This creates editable markers; want a different set for display-only. */
        attractionsList.forEach(
          (attraction) => {
            const marker: ClickableMarker = this.poolMarkerService.getAttractionMarker(attraction);
            this.layerPerCategory[categoryId].addLayer(marker);
          }
        );

      }
    }

    this.attractionLayerSubject.next(true);

    return this.attractionLayerSubject.asObservable();
  }

  /**
   * Trigger for turning on or off each Category Layer -- or the Outing Layer.
   *
   * Algorithm is to review list of all Categories against what is currently on or off, and decide
   * if a change needs to be made to that Category, either turning it on or turning it off.
   *
   * @param filter
   */
  showFilteredAttractions(filter: Filter): void {
    if (!this.mapWithLayers) {
      console.log(
        'Map not yet provided; call `loadAttractionLayers()` first'
      )
      return;
    }

    const existingLayers = this.mapWithLayers.getLayers();
    this.categoryService.getAllCategories().forEach(
      (category) => {
        console.log('Checking category ID ' + category.id);

        /* Only toggle the layer if we have markers for the category. */
        if (this.layerPerCategory[category.id]) {
          const layerTurnedOn = existingLayers.includes(this.layerPerCategory[category.id]);
          const filterTurnedOn = filter.categoriesToIncludeById.includes(category.id);
          if (layerTurnedOn != filterTurnedOn) {
            if (filterTurnedOn) {
              this.mapWithLayers.addLayer(this.layerPerCategory[category.id]);
            } else {
              this.mapWithLayers.removeLayer(this.layerPerCategory[category.id]);
            }
          }
        }
      }
    );

  }

}
