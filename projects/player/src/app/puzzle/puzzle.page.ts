import {
  Component,
  OnInit
} from '@angular/core';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import {
  Answer,
  AnswerKey,
  AnswerSummaryService,
  Puzzle,
  PuzzleService
} from 'cr-lib';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-puzzle',
  templateUrl: './puzzle.page.html',
  styleUrls: ['./puzzle.page.scss'],
})
export class PuzzlePage implements OnInit {

  public puzzle: Puzzle;

  private puzzleId: number;
  private subscription: Subscription;

  constructor(
    private puzzleService: PuzzleService,
    private activatedRoute: ActivatedRoute,
    private answerSummaryService: AnswerSummaryService,
    private router: Router,
  ) {
    /* Blank puzzle to avoid exceptions being thrown by template. */
    this.puzzle = new Puzzle();
    this.puzzle.answers = [];
    this.puzzle.answers.push(new Answer());
  }

  ngOnInit() {
    this.subscription = this.activatedRoute.queryParams.subscribe(
      (params) => {
        this.puzzleId = parseInt(this.activatedRoute.snapshot.paramMap.get('id'), 10);
        console.log('PuzzlePage.ngOnInit: puzzleId =', this.puzzleId);
        this.puzzle = this.puzzleService.getPuzzle(
          this.puzzleId
        );
      });
  }


  /**
   * Responds to selection of an answer by the seeker.
   *
   * @param choice is the answer key chosen by the seeker.
   */
  selectAsAnswer(choice: string) {
    this.answerSummaryService.postAnswer(this.puzzle.id, AnswerKey[choice]).subscribe(
      (answerSummary) => {
        console.log('PuzzlePage: got result from posting answer for puzzle', answerSummary.puzzleId);
        this.router.navigate(['answer', this.puzzle.id]);
      }
    );
  }

}
