import {GameMarkerService} from './game-marker.service';

const routerSpy = jasmine.createSpyObj('Router', ['get']);

describe('GameMarkerService', () => {
  it('should be created', () => {
    const service: GameMarkerService = new GameMarkerService(routerSpy);
    expect(service).toBeTruthy();
  });
});
