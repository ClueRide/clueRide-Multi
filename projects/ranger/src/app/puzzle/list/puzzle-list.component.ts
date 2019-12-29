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
import {PuzzleModalPage} from '../modal/puzzle-modal.page';

@Component({
  selector: 'app-puzzle-list',
  templateUrl: './puzzle-list.component.html',
  styleUrls: ['./puzzle-list.component.scss'],
})
export class PuzzleListComponent implements OnInit {

  @Input() attraction: Attraction;
  public puzzles: Puzzle[];

  constructor(
    private modalController: ModalController,
    private puzzleService: PuzzleService,
  ) { }

  ngOnInit(): void {
    this.puzzleService.getPuzzles(this.attraction.id)
      .subscribe(
        (puzzles) => {
          this.puzzles = puzzles;
        }
      );
  }

  public itemTapped($event, item) {
    this.openModalForPuzzleItem(
      item
    ).then(
      () => console.log('Item tapped Success')
    ).catch(
      (error) => console.log('Item tapped Error', error)
    );
  }

  async openModalForPuzzleItem(item) {
    const puzzleModal = await this.modalController.create({
      component: PuzzleModalPage,
      componentProps: {
        puzzle: item,
        attraction: this.attraction
      }
    });
    return await puzzleModal.present();
  }

  /**
   *
   */
  addNewPuzzle() {
    console.log('Adding new Puzzle');
    this.puzzleService.getBlankPuzzleForLocation(this.attraction).subscribe(
      (puzzle) => {
        this.puzzles.push(puzzle);
        this.openModalForPuzzleItem(
          puzzle
      ).then(
          () => console.log('Add New Puzzle Success')
        ).catch(
          (error) => console.log('Add New Puzzle Error', error)
        );
      }
    );
  }

}
