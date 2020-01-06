import {Component} from '@angular/core';
import {
  Attraction,
  AttractionService,
  Outing,
  OutingService,
  Path,
  PathService,
  PoolMarkerService
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
import {GameState} from '../game/game-state';
import {GameStateService} from '../game/game-state.service';
import {GuideEventService} from '../state/guide-event-service.service';

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

  private map: any;
  /* Providing a layer upon which we pile on the stuff we show the user should be easier this way. */
  private edgeLayer: any;

  /* Exposed for the view. */
  public title = 'Map';
  public outing: Outing;
  public gameState: GameState;

  constructor(
    private attractionService: AttractionService,
    private gameStateService: GameStateService,
    private guideEventService: GuideEventService,
    private markerService: PoolMarkerService,
    private outingService: OutingService,
    private pathService: PathService,
  ) { }

  ionViewWillEnter() {
    console.log('RollingPage: Map Creation (ionViewWillEnter)');

    /* TODO: This should be synchronous for most clients of this service. */
    this.outingService.getSessionOuting().subscribe(
      (outing) => {
        this.outing = outing;
      }
    );

    this.map = L.map('rolling-map');
    this.prepareRollingMap();
    this.gameStateService.requestGameState()
      .subscribe(
        (gameState) => {
          this.gameState = gameState;
          this.updatePathsOnMap(this.gameState);
        }
      );
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
    // this.titleService.setTitle(this.title);
  }

  public prepareRollingMap() {
    const startingAttraction: Attraction = this.attractionService.getVisibleAttractions(0)[0];

    /* Temporary just to get the map in the ball-park of the track I've pulled in. */
    const leafletPosition = [
      startingAttraction.latLon.lat,
      startingAttraction.latLon.lon
    ];

    this.map.setView(leafletPosition, DEFAULT_ZOOM_LEVEL);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);
    this.edgeLayer = L.geoJSON().addTo(this.map);

    if (!this.gameState || this.gameState.pathIndex < 0) {
      this.addMarkerForAttraction(startingAttraction);
    }
  }

  /**
   * Draw all the cached paths up to our current attraction along with those attractions.
   * History paths are a different color from the current path.
   */
  private updatePathsOnMap(gameState: GameState) {
    if (gameState.pathIndex < 0) {
      console.log('Outing has not yet begun rolling');
      return;
    }

    /* Define operation that adds Current (green) line to the map. */
    const addCurrentPathToMap = tap((path: Path) => {
        const styledPath = L.geoJSON(path.features, {
          style: GREEN_LINE
        });
        styledPath.addTo(this.map);
        /* Adjust map zoom/center to fit the last path added. */
        this.map.fitBounds(styledPath.getBounds().pad(.2));
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
            ).addTo(this.map);
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
    // TODO: Awaiting CI-87 GameMarkerService.
    // const marker = this.markerService.generateAttractionMarker(
    //   attraction,
    //   this.navCtrl
    // );

    // marker.addTo(this.edgeLayer);
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

  public signalArrival() {
    this.guideEventService.sendArrival();
  }

}
