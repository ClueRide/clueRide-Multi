import {FlagReason} from '../flag-reason/flag-reason.enum';
import {FlaggedAttribute} from '../flagged-attribute/flagged-attribute.enum';

export class Flag {
  id: number;
  attractionId: number;
  reason: FlagReason;
  description: string;
  // TODO SVR-102: Straighten out the two names for the same value -- probably involves the server code
  attribute: FlaggedAttribute;
  flaggedAttribute: FlaggedAttribute;
  openBadgeEventId: number;
  closeBadgeEventId: number;
}
