import {
  Component,
  OnInit
} from '@angular/core';
import {NavController} from "@ionic/angular";

@Component({
  selector: 'app-game-complete',
  templateUrl: './game-complete.page.html',
  styleUrls: ['./game-complete.page.scss'],
})
export class GameCompletePage implements OnInit {

  public outing = {
    courseName: 'Testing'
  };
  public courseSummary = {
    distance: 3.1,
    puzzleCount: 5,
    attractionCount: 5
  };

  constructor(
    private navController: NavController
  ) { }

  ngOnInit() {
  }

  celebrate(): void {
    console.log('We\'re done');
    this.navController.navigateRoot(
      ['home']
    );
  }

}
