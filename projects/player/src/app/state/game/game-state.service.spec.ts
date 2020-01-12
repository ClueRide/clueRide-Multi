import {HttpClient} from '@angular/common/http';
import {TestBed} from '@angular/core/testing';
import {
  AuthHeaderService,
  ServerEventsService
} from 'cr-lib';
import {of} from 'rxjs';

import {GameStateService} from './game-state.service';

const authHeaderSpy = jasmine.createSpyObj('AuthHeaderService', ['headers']);
const httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
const sseSpy = jasmine.createSpyObj('ServerEventsService', ['getGameStateEventObservable']);

let getGameStateObservableSpy;

describe('GameStateService', () => {
  beforeEach( () => {
    getGameStateObservableSpy = sseSpy.getGameStateEventObservable.and.returnValue(of({}));

    TestBed.configureTestingModule({
      providers: [
        GameStateService,
        {provide: AuthHeaderService, useValue: authHeaderSpy},
        {provide: HttpClient, useValue: httpClientSpy},
        {provide: ServerEventsService, useValue: sseSpy},
      ]
    });
  });

  it('should be created', () => {
    const service: GameStateService = TestBed.get(GameStateService);
    expect(service).toBeTruthy();
  });

});
