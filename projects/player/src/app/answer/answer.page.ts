import {
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {
  AnswerSummary,
  AnswerSummaryService,
  Puzzle,
  PuzzleService
} from 'cr-lib';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.page.html',
  styleUrls: ['./answer.page.scss'],
})
export class AnswerPage implements OnInit, OnDestroy {

  public puzzle: Puzzle;
  public answerSummary: AnswerSummary;

  private subscription: Subscription;

  constructor(
    private answerSummaryService: AnswerSummaryService,
    private activatedRoute: ActivatedRoute,
    private puzzleService: PuzzleService,
  ) { }

  ngOnInit() {
    this.subscription = this.activatedRoute.queryParams.subscribe(
      (params) => {
        const puzzleId = parseInt(this.activatedRoute.snapshot.paramMap.get('id'), 10);
        console.log('AnswerPage.ngOnInit: puzzleId = ', puzzleId);
        this.puzzle = this.puzzleService.getPuzzle(puzzleId);
      });

    this.subscription.add(this.answerSummaryService.getAnswerSummaryChannel().subscribe(
      (answerSummary) => {
        this.answerSummary = Object.assign({}, answerSummary);
        console.log('AnswerPage: Received Answer Summary for ', answerSummary.puzzleId);
      }
    ));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  public isCorrectAnswer(answer: string): boolean {
    return this.answerSummary && this.answerSummary.correctAnswer.toString() === answer;
  }

  public answerColor(answer: string): string {
    if (this.isCorrectAnswer(answer)) {
      return 'success';
    } else {
      return 'danger';
    }
  }

}
