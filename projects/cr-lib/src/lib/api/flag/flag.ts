import {FlagReason} from '../flag-reason/flag-reason.enum';
import {FlaggedAttribute} from '../flagged-attribute/flagged-attribute.enum';

export class Flag {
  id: number;
  attractionId: number;
  reason: FlagReason;
  description: string;
  flaggedAttribute: FlaggedAttribute;
  openBadgeEventId: number;
  closeBadgeEventId: number;
}
