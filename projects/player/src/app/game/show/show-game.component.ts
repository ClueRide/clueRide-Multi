import {
  Component,
  OnInit
} from '@angular/core';
import {Router} from '@angular/router';
import {take} from 'rxjs/operators';
import {GameStateService} from '../game-state.service';

@Component({
  selector: 'app-show-game',
  templateUrl: './show-game.component.html',
  styleUrls: ['./show-game.component.scss'],
})
export class ShowGameComponent implements OnInit {

  constructor(
    private gameStateService: GameStateService,
    private router: Router
  ) { }

  ngOnInit() {}

  public showGame(): void {
    this.gameStateService.requestGameState()
      .pipe(
        take(1)
      )
      .subscribe(
        (gameState) => {
          if (gameState.pathIndex < 0
            || !gameState.teamAssembled
            || gameState.rolling
          ) {
            this.router.navigate(['rolling']);
          } else {
            this.router.navigate(['puzzle']);
          }
        }
      );
  }
}
