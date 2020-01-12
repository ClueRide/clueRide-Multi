import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {
  async,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';
import {Router} from '@angular/router';
import {GameStateService} from '../game/game-state.service';

import {ShowGameComponent} from './show-game.component';

describe('ShowGameComponent', () => {
  let component: ShowGameComponent;
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
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('routeBasedOnGameState', () => {

    beforeEach(() => {
      routerSpy.navigate.calls.reset();
    });

    it('should route to Rolling if we are indeed rolling', () => {
      /* train mocks */
      routerSpy.navigate.and.returnValue(Promise.resolve());

      /* make call */
      component.routeBasedOnGameState({rolling: true, teamAssembled: true});

      /* verify results */
      expect(routerSpy.navigate).toHaveBeenCalledWith(['rolling']);
    });

    it('should route to Rolling if we\'re still gathering', () => {
      /* train mocks */
      routerSpy.navigate.and.returnValue(Promise.resolve());

      /* make call */
      component.routeBasedOnGameState({rolling: false, teamAssembled: false});

      /* verify results */
      expect(routerSpy.navigate).toHaveBeenCalledWith(['rolling']);
    });

    it('should route to Puzzle if Team is assembled and we haven\'t started rolling yet.', () => {
      /* train mocks */
      routerSpy.navigate.and.returnValue(Promise.resolve());

      /* make call */
      component.routeBasedOnGameState({rolling: false, teamAssembled: true});

      /* verify results */
      expect(routerSpy.navigate).toHaveBeenCalledWith(['puzzle']);
    });

  });

});
