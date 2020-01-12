import {TestBed} from '@angular/core/testing';
import {Router} from '@angular/router';

import {GameRoutingService} from './game-routing.service';
import {GameStateService} from './game/game-state.service';

describe('GameRoutingService', () => {

  const gameStateSpy = jasmine.createSpyObj('GameStateService', ['get']);
  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      GameRoutingService,
      {provide: GameStateService, useValue: gameStateSpy},
      {provide: Router, useValue: routerSpy},
    ]
  }));

  it('should be created', () => {
    const service: GameRoutingService = TestBed.get(GameRoutingService);
    expect(service).toBeTruthy();
  });
});
