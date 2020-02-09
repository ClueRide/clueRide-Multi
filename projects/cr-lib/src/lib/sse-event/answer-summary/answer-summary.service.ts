import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {AnswerKey} from '../../api/puzzle/answer';
import {
  AuthHeaderService,
  BASE_URL
} from '../../auth/header/auth-header.service';
import {ServerEventsService} from '../sse-event.service';
import {AnswerPost} from './answer-post';
import {AnswerSummary} from './answer-summary';

/**
 * Responsible for Answer Summaries.
 *
 * Posting Answers and following the stream of AnswerSummaries until the Puzzle is closed.
 */
@Injectable({
  providedIn: 'root'
})
export class AnswerSummaryService {

  constructor(
    public http: HttpClient,
    public httpService: AuthHeaderService,
    public sseService: ServerEventsService,
  ) {
    console.log('Hello AnswerSummaryService');
  }

  /**
   * Retrieves the Observable for the AnswerSummary SSE events.
   *
   * No need to open a subscription here.
   */
  public getAnswerSummaryChannel(): Observable<AnswerSummary> {
    return this.sseService.getAnswerSummaryObservable()
      .pipe(
        tap((answerSummary) => console.log(
          'AnswerSummaryService: Received AnswerSummary for puzzle',
          answerSummary.puzzleId)
        )
      );
  }

  /**
   * Send in player's answer and get back the current AnswerSummary.
   * @param puzzleId unique identifier for the Puzzle we're answering.
   * @param myAnswer AnswerKey matching the selected answer.
   */
  public postAnswer(
    puzzleId: number,
    myAnswer: AnswerKey
  ): Observable<AnswerSummary> {
    const answerPost = new AnswerPost(puzzleId, myAnswer);
    return this.http.post<AnswerSummary>(
      BASE_URL + 'puzzle/answer',
      answerPost,
      {headers: this.httpService.getAuthHeaders()}
    );
  }

}
