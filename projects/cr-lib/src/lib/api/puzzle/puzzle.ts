import {Answer, AnswerKey} from './answer';

/**
 * Defines properties of a Puzzle.
 * Many-to-one per Location
 */
export class Puzzle {
  id: number;
  name: string;
  locationName: string;
  locationId: number;
  question: string;
  answers: Array<Answer>;
  correctAnswer: AnswerKey;
  points: number;
}

