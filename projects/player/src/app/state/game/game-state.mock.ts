import {GameState} from './game-state';

export class GameStateMock {

  public generateInitialMock(): GameState {
    return {
      teamAssembled: false,
      rolling: false,
      nextLocationName: 'Meeting Location',
      outingState: 'not sure what I want here',
      pathIndex: -1,
      locationId: 1,
      puzzleId: 1
    };
  }

}
