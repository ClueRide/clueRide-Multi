import {AnswerKey} from '../../api/puzzle/answer';

export class AnswerPost {
  puzzleId: number;
  answer: string;

  constructor(puzzleId: number, myAnswer: AnswerKey) {
    this.puzzleId = puzzleId;
    this.answer = AnswerKey[myAnswer];
  }

}

