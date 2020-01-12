import {HttpClient} from '@angular/common/http';
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

  beforeEach(async(() => {
    const httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const gameStateSpy = jasmine.createSpyObj('GameStateService', [
      'requestGameState',
      'getOutingState'
    ]);

    TestBed.configureTestingModule({
      declarations: [ ShowGameComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        ShowGameComponent,
        {provide: HttpClient, useValue: httpClientSpy},
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

});
