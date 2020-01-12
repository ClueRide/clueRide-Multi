import {
  Injectable,
  OnDestroy
} from '@angular/core';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {GameStateService} from './game/game-state.service';

/**
 * Responds to GameState changes to navigate from Rolling to Puzzle and back.
 *
 * This is how the team for a given outing is kept "on the same page".
 */
@Injectable({
  providedIn: 'root'
})
export class GameRoutingService implements OnDestroy {

  private subscription: Subscription;

  constructor(
    private gameStateService: GameStateService,
    private router: Router,
  ) {
    console.log('GameRoutingService: constructing');
    this.subscription = new Subscription();
  }

  /**
   * Decide which page to show next based on the updated GameState received.
   */
  setupSubscriptions() {
    console.log('GameRoutingService: Setting up Subscriptions');
    this.subscription.add(
      this.gameStateService.puzzleEvents()
        .subscribe(
          (gameState) => this.goToPuzzle(gameState.puzzleId)
        )
    );
    this.subscription.add(
      this.gameStateService.rollingEvents()
        .subscribe(
          (gameState) => this.goToRolling()
        )
    );
  }

  goToPuzzle(puzzleId: number): void {
    console.log('Arrival Event: Puzzle time');

    /* Case where we send out a Puzzle to be solved. */
    this.router.navigate(
      ['puzzle', puzzleId]
    );
  }

  goToRolling(): void {
    console.log('Depart Event: Rolling');

    /* Ready to show our position on the map. */
    this.router.navigate(
      ['rolling']
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
