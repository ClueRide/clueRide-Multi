import {Component} from '@angular/core';
import {
  Attraction,
  AttractionService,
  GameMarkerService,
  Path,
  PathService
} from 'cr-lib';

import * as L from 'leaflet';
import {
  from,
  range
} from 'rxjs';
import {
  last,
  map,
  tap
} from 'rxjs/operators';
import {GameState} from '../state/game/game-state';
import {GameStateService} from '../state/game/game-state.service';
import {GuideEventService} from '../state/guide-event.service';

/** Defines reasonable Zoom Level for initially opening the map. */
const DEFAULT_ZOOM_LEVEL = 14;

const GREEN_LINE = {
  color: '#00FF00',
  weight: 6,
  opacity: .75
};

const BLUE_LINE = {
  color: '#4040FF',
  weight: 4,
  opacity: .55
};

@Component({
  selector: 'app-rolling',
  templateUrl: './rolling.page.html',
  styleUrls: ['./rolling.page.scss'],
})
export class RollingPage {

  static map: any;
  /* Providing a layer upon which we pile on the stuff we show the user should be easier this way. */
  static pathGroup: any;
  static markerGroup: any;

  /* Exposed for the view. */
  public title = 'Map';
  public gameState: GameState;

  constructor(
    private attractionService: AttractionService,
    private gameMarkerService: GameMarkerService,
    private gameStateService: GameStateService,
    private guideEventService: GuideEventService,
    private pathService: PathService,
  ) {
    /* Initialize GameState here to make sure we are caught up with current state as we join in. */
    /* This should pull from a ReplaySubject that holds just the last GameState; don't care how that gets populated. */
    this.gameStateService.requestGameState()
      .subscribe(
        (gameState) => {
          this.gameState = gameState;
        }
      );
  }

  ionViewWillEnter() {
    console.log('RollingPage: Map Creation (ionViewWillEnter)');

    if (!RollingPage.map) {
      RollingPage.map = L.map('rolling-map');
      RollingPage.pathGroup = L.geoJSON().addTo(RollingPage.map);
      RollingPage.markerGroup = L.layerGroup().addTo(RollingPage.map);
    }
    this.prepareRollingMap();
    this.updatePathsOnMap(this.gameState);

  }

  ionViewDidEnter() {
    console.log('RollingPage.ionViewDidEnter');
    switch (this.gameStateService.getOutingState()) {
      case 'PENDING_ARRIVAL':
        this.title = 'Start Location';
        break;

      case 'IN_PROGRESS':
      default:
        this.title = 'Rolling';
        break;

      case 'COMPLETE':
        this.title = 'Game Complete';
        break;
    }
  }

  public prepareRollingMap() {
    const startingAttraction: Attraction = this.attractionService.getVisibleAttractions(0)[0];

    /* Temporary just to get the map in the ball-park of the track I've pulled in. */
    // TODO: CI-37 / LE-70 - translating position.
    const leafletPosition = [
      startingAttraction.latLon.lat,
      startingAttraction.latLon.lon
    ];

    RollingPage.map.setView(leafletPosition, DEFAULT_ZOOM_LEVEL);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(RollingPage.map);

    /* In case the game hasn't begun, at least show the Starting Location. */
    if (!this.gameState || this.gameState.pathIndex < 0) {
      this.addMarkerForAttraction(startingAttraction);
    }
  }

  /**
   * Draw all the cached paths up to our current attraction along with those attractions.
   * History paths are a different color from the current path.
   *
   * If there are existing paths/markers, these are first cleared and then re-drawn.
   */
  private updatePathsOnMap(gameState: GameState) {
    if (gameState.pathIndex < 0) {
      console.log('Outing has not yet begun rolling');
      return;
    }

    this.clearMap();

    /* Define operation that adds Current (green) line to the map. */
    const addCurrentPathToMap = tap((path: Path) => {
        const styledPath = L.geoJSON(path.features, {
          style: GREEN_LINE
        });
        styledPath.addTo(RollingPage.pathGroup);
        /* Adjust map zoom/center to fit the last path added. */
        RollingPage.map.fitBounds(styledPath.getBounds().pad(.2));
      }
    );

    /* Because we start at zero, we have to run for one more than the current index. */
    console.log('Path index ' + gameState.pathIndex);
    range(0, gameState.pathIndex + 1)
      .pipe(
        map((pathIndex: number): Path => this.pathService.getPathGeoJsonByIndex(pathIndex)),
        tap(
          /* Adds history line to the map. */
          (path: Path) => {
            L.geoJSON(
              path.features, {
                style: BLUE_LINE,
              }
            ).addTo(RollingPage.pathGroup);
          }
        ),
        last(),
        addCurrentPathToMap
      )
      .subscribe();

    /* Add Attractions to the Map. */
    from(this.attractionService.getVisibleAttractions(gameState.pathIndex))
      .pipe(
        tap(attraction => this.addMarkerForAttraction(attraction))
      )
      .subscribe();

  }

  /**
   * Places a Marker that carries the Attraction ID and the attraction's name.
   *
   * @param attraction Attraction to be placed on map.
   */
  private addMarkerForAttraction(
    attraction: Attraction
  ) {
    const marker = this.gameMarkerService.generateAttractionMarker(attraction);
    marker.addTo(RollingPage.markerGroup);
  }

  /** Removes existing paths and markers to prepare for redrawing the map. */
  private clearMap() {
    RollingPage.markerGroup.clearLayers();
    RollingPage.pathGroup.clearLayers();
  }

  /**
   * Tells whether the current session is associated with a Guide.
   */
  public isGuide(): boolean {
    return this.guideEventService.isCurrentMemberGuide();
  }

  public isGameStarted(): boolean {
    return this.gameStateService.isGameStarted();
  }

  /**
   * Returns true if the current session is opened by a Guide and we're currently rolling.
   */
  public canSignalArrival(): boolean {
    return this.guideEventService.isCurrentMemberGuide() && this.gameStateService.isRolling();
  }

  public signalArrival() {
    this.guideEventService.sendArrival();
  }

}
