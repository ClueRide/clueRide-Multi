import {BadgeFeatures} from '../api/badge-progress/badge-features';

/**
 * SSE sends this when a Badge is awarded.
 */
export class BadgeEvent {
  userId: number;
  badgeFeatures: BadgeFeatures;
}
