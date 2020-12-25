import {
  Component,
  Input,
  OnDestroy
} from '@angular/core';
import {
  Attraction,
  GameMarkerService,
  LatLonService
} from 'cr-lib';
import * as L from 'leaflet';
import {
  Observable,
  Subscription
} from 'rxjs';

/**
 * Provides a simple map showing Attraction(s) provided via
 * the 'startingLocationObservable'.
 */
@Component({
  selector: 'app-pinned-map',
  templateUrl: './pinned-map.component.html',
  styleUrls: ['./pinned-map.component.scss'],
})
export class PinnedMapComponent implements OnDestroy {

  static map: any;

  @Input() startingLocationObservable: Observable<Attraction>;

  zoomLevel = 14;
  subscription: Subscription;
  loading: boolean;

  constructor(
    private latLonService: LatLonService,
    private markerService: GameMarkerService,
  ) {
    this.subscription = new Subscription();
    this.loading = true;
  }

  ngOnInit(): void {
    console.log('Pinned Map: ngOnInit');

    /* Request the starting Attraction. */
    this.subscription.add(
      this.startingLocationObservable
        .subscribe(
          (attraction: Attraction) => {
            if (attraction) {
              this.prepareMap(attraction);
              this.markerService.generateAttractionMarker(
                attraction
              ).addTo(PinnedMapComponent.map);
            } else {
              console.log('Pinned Map: empty Attraction');
            }
          }
        )
    );

  }

  /**
   * Once the Attraction is given, we'll be able to prepare the map.
   *
   * @param startingAttraction the Attraction where team members gather at the start.
   */
  prepareMap(startingAttraction: Attraction) {
    if (!PinnedMapComponent.map) {
      PinnedMapComponent.map = L.map('pinned-map');

      const leafletPosition = this.latLonService.toLatLng(startingAttraction.latLon);

      PinnedMapComponent.map.setView(leafletPosition, this.zoomLevel);

      /* Specify the tile layer for the map and add the attribution. */
      const tileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(PinnedMapComponent.map);
      tileLayer.on('tileload', () => this.loading = false);
    }
  }

  /* Cleanup after ourselves. */
  ngOnDestroy(): void {
    if (PinnedMapComponent.map) {
      PinnedMapComponent.map.remove();
      PinnedMapComponent.map = null;
    }

    this.subscription.unsubscribe();
  }

}
