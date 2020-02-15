import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {take} from 'rxjs/operators';
import {GameStateService} from '../state/game/game-state.service';

@Injectable({
  providedIn: 'root'
})
export class ShowGameService {

  constructor(
    private gameStateService: GameStateService,
    private router: Router
  ) { }

  /**
   * When called, asks the GameState Service which state we're in, and then
   * chooses the next page based on that Game State.
   */
  public showGame(): void {
    this.gameStateService.requestGameState()
      .pipe(
        take(1)
      )
      .subscribe(
        (gameState) => {
          this.routeBasedOnGameState(gameState);
        }
      );
  }

  /**
   * Choose the next page based on whether we're rolling or not.
   *
   * @param gameState tells us whether we're rolling or not.
   */
  routeBasedOnGameState(gameState): void {
    let promise;

    if (
      gameState.rolling || !gameState.teamAssembled
    ) {
      promise = this.router.navigate(['rolling']);
    } else {
      promise = this.router.navigate(['puzzle', gameState.puzzleId]);
    }

    promise.catch(
      (error) => {
        console.log('Error navigating to Game:', error);
      }
    );
  }

}
