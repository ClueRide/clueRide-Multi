import {
  Component,
  Input,
  OnInit
} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {
  Attraction,
  Puzzle,
  PuzzleService
} from 'cr-lib';

@Component({
  selector: 'app-puzzle-modal',
  templateUrl: './puzzle-modal.page.html',
  styleUrls: ['./puzzle-modal.page.scss'],
})
export class PuzzleModalPage implements OnInit {

  @Input() puzzle: Puzzle;
  @Input() attraction: Attraction;

  constructor(
    private puzzleService: PuzzleService,
    private modalController: ModalController,
  ) { }

  ngOnInit() {
  }

  saveAndCloseModal() {
    this.puzzleService.savePuzzle(this.puzzle).subscribe(
      (puzzle) => {
        this.modalController.dismiss();
      }
    );
  }

  cancelAndCloseModal() {
    this.modalController.dismiss();
  }

  selectCorrectAnswer(key) {
    this.puzzle.correctAnswer = key;
  }

}
