export class GameState {
  teamAssembled: boolean;
  rolling: boolean;
  nextLocationName: string;
  outingComplete?: boolean;
  outingState: string;
  pathIndex: number;
  locationId: number;
  puzzleId: number;
}
