import {
  Injectable,
  OnDestroy
} from '@angular/core';
import {Subscription} from 'rxjs';
import {GameStateService} from 'cr-lib';
import {NavController} from '@ionic/angular';

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
    private navController: NavController
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
    this.subscription.add(
      this.gameStateService.gameCompleteEvents()
        .subscribe(
          () => this.goToGameComplete()
        )
    )
  }

  goToPuzzle(puzzleId: number): void {
    console.log('Arrival Event: Puzzle time');

    /* Case where we send out a Puzzle to be solved. */
    this.navController.navigateForward(
      ['puzzle', puzzleId]
    );
  }

  goToRolling(): void {
    console.log('Depart Event: Rolling');

    /* Ready to show our position on the map. */
    this.navController.navigateBack(
      ['rolling']
    );
  }

  goToGameComplete(): void {
    console.log('Game Complete Event: badges for everyone');

    this.navController.navigateRoot(
      ['game-complete']
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
