import {HttpClient} from '@angular/common/http';
import {TestBed} from '@angular/core/testing';

import {GameStateService} from './game-state.service';

describe('GameStateService', () => {
  beforeEach( () => {
    const httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    TestBed.configureTestingModule({
      providers: [
        GameStateService,
        {provide: HttpClient, useValue: httpClientSpy}
      ]
    });
  });

  it('should be created', () => {
    const service: GameStateService = TestBed.get(GameStateService);
    expect(service).toBeTruthy();
  });

});
