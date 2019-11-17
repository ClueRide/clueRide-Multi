/**
 * Holds the details about progress toward a Badge.
 */
import {BadgeFeatures} from './badge-features';
import {Step} from './step';
import {Achievement} from './achievement';
import {Progress} from './progress';

export class BadgeProgress {
  id: number;   // Also the Badge ID
  badgeFeatures: BadgeFeatures;
  steps: Step[];
  achievements: Achievement[];
  progress: Progress;
}
