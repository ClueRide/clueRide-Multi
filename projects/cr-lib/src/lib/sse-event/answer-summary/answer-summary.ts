/**
 * Count of the number of responses given for each Answer(Key).
 */
import {AnswerKey} from '../../api/puzzle/answer';

interface AnswerMap {
  /* The string should come from AnswerKey.[answerKey:AnswerKey]. */
  [index: string]: number;
}

/**
 * Maps to AnswerSummary.
 */
export class AnswerSummary {
  puzzleId: number;
  correctAnswer: AnswerKey;
  myAnswer: AnswerKey;
  answerMap: AnswerMap;
}
