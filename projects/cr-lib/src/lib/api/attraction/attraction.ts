import {LatLon} from '../../domain/lat-lon/lat-lon';
import {Image} from '../image/image';
import {LocLink} from '../loc-link/loc-link';
import {LocationType} from '../loc-type/loc-type';
import {Flag} from '../flag/flag';

/**
 * Attractions are specific instances of Location; they have a
 * puzzle defined for them.
 */
export class Attraction {

  id: number;
  nodeId: number;   // Provides Lat/Lon
  latLon: LatLon;
  name?: string;
  description?: string;
  locationGroupId?: number;
  locationTypeName?: string;
  locationTypeIconName?: string;
  locationTypeId: number;
  locationType?: LocationType | null;
  featuredImageUrl?: string;
  featuredImage: Image;
  establishmentId?: number;
  readinessLevel: string;
  flags?: Flag[];
  isLast?: boolean;
  isCurrent?: boolean;
  mainLink?: LocLink;
  otherLinks?: LocLink[];
}
