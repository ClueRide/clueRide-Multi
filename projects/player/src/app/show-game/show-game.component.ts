import {Component} from '@angular/core';
import {GameStateService} from '../state/game/game-state.service';
import {ShowGameService} from './show-game.service';

@Component({
  selector: 'app-show-game',
  templateUrl: './show-game.component.html',
  styleUrls: ['./show-game.component.scss'],
})
export class ShowGameComponent {

  constructor(
    /* Exposed for the view. */
    public gameStateService: GameStateService,
    private showGameService: ShowGameService,
  ) { }

  /**
   * Simply wraps the service call to expose to our view.
   */
  public showGame(): void {
    this.showGameService.showGame();
  }

}
