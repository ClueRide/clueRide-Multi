import {
  Component,
  OnInit
} from '@angular/core';
import {
  Answer,
  Puzzle,
  PuzzleService
} from 'cr-lib';

@Component({
  selector: 'app-puzzle',
  templateUrl: './puzzle.page.html',
  styleUrls: ['./puzzle.page.scss'],
})
export class PuzzlePage implements OnInit {

  public puzzle: Puzzle;

  private puzzleId: number;

  constructor(
    private puzzleService: PuzzleService
  ) {
    // TODO: CI-84 Temporary Puzzle ID until I hook in the route params
    this.puzzleId = 160;
    this.puzzle = new Puzzle();
    this.puzzle.answers = [];
    this.puzzle.answers.push(new Answer());
  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    // let puzzleId = this.navParams.get('id');
    // console.log('PuzzlePage.ionViewDidEnter; puzzleId = ', this.puzzleId);
    // this.titleService.setTitle("Puzzle");
    // this.puzzle = this.puzzleService.getPuzzle(
    //   this.puzzleId
    // );
  }

}
