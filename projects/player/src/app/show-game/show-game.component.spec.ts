import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {
  async,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';
import {Router} from '@angular/router';
import {
  GameState,
  GameStateService
} from 'cr-lib';

import {ShowGameComponent} from './show-game.component';

const mockGameState: GameState = {
  rolling: true,
  teamAssembled: true,
  nextLocationName: null,
  outingState: null,
  pathIndex: 1,
  locationId: 0,
  puzzleId: 4
};

describe('ShowGameComponent', () => {
  let toTest: ShowGameComponent;
  let fixture: ComponentFixture<ShowGameComponent>;

  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
  const gameStateSpy = jasmine.createSpyObj('GameStateService', [
    'requestGameState',
    'getOutingState'
  ]);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowGameComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        ShowGameComponent,
        {provide: GameStateService, useValue: gameStateSpy},
        {provide: Router, useValue: routerSpy},
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowGameComponent);
    toTest = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(toTest).toBeTruthy();
  });

  describe('routeBasedOnGameState', () => {

    beforeEach(() => {
      routerSpy.navigate.calls.reset();
    });

    it('should be defined', () => {
      expect(toTest.showGameService).toBeDefined();
    });

    it('should route to Rolling if we are indeed rolling', () => {
      /* train mocks */
      routerSpy.navigate.and.returnValue(Promise.resolve());

      /* make call */
      toTest.showGameService.routeBasedOnGameState({rolling: true, teamAssembled: true});

      /* verify results */
      expect(routerSpy.navigate).toHaveBeenCalledWith(['rolling']);
    });

    it('should route to Rolling if we\'re still gathering', () => {
      /* train mocks */
      routerSpy.navigate.and.returnValue(Promise.resolve());

      /* make call */
      toTest.showGameService.routeBasedOnGameState({rolling: false, teamAssembled: false});

      /* verify results */
      expect(routerSpy.navigate).toHaveBeenCalledWith(['rolling']);
    });

    it('should route to Puzzle if Team is assembled and we haven\'t started rolling yet.', () => {
      /* train mocks */
      routerSpy.navigate.and.returnValue(Promise.resolve());

      /* make call */
      toTest.showGameService.routeBasedOnGameState({rolling: false, teamAssembled: true, puzzleId: 42});

      /* verify results */
      expect(routerSpy.navigate).toHaveBeenCalledWith(['puzzle', 42]);
    });

  });

});
