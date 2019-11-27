export class Answer {
  id: number;
  answerKey: AnswerKey;
  answer: string;
}

/**
 * Possible answer keys.
 */
export enum AnswerKey {
  A, B, C, D, E
}
