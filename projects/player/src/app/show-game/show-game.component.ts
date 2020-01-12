import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {take} from 'rxjs/operators';
import {GameStateService} from '../state/game/game-state.service';

@Component({
  selector: 'app-show-game',
  templateUrl: './show-game.component.html',
  styleUrls: ['./show-game.component.scss'],
})
export class ShowGameComponent {

  constructor(
    private gameStateService: GameStateService,
    private router: Router
  ) { }

  public showGame(): void {
    // TODO: This probably could be either a) synchronous or b) pulled from a ReplaySubject.
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
