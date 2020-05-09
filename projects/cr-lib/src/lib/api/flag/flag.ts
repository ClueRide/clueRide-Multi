import {FlagReason} from './flag-reason.enum';
import {FlaggedAttribute} from './flagged-attribute.enum';

export class Flag {
  id: number;
  attractionId: number;
  reason: FlagReason;
  details: {
    description: string;
    attribute: FlaggedAttribute;
  };
  openBadgeEventId: number;
  closeBadgeEventId: number;
}
