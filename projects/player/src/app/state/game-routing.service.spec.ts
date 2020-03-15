import {TestBed} from '@angular/core/testing';

import {GameRoutingService} from './game-routing.service';
import {GameStateService} from './game/game-state.service';
import {NavController} from "@ionic/angular";

describe('GameRoutingService', () => {

  const gameStateSpy = jasmine.createSpyObj('GameStateService', ['get']);
  const navSpy = jasmine.createSpyObj('Router', ['navigate']);

  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      GameRoutingService,
      {provide: GameStateService, useValue: gameStateSpy},
      {provide: NavController, useValue: navSpy},
    ]
  }));

  it('should be created', () => {
    const service: GameRoutingService = TestBed.get(GameRoutingService);
    expect(service).toBeTruthy();
  });
});
