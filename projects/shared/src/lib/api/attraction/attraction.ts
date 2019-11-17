import {Image} from '../image/image';
import {Injectable} from '@angular/core';
import {LatLon} from '../lat-lon/lat-lon';

/**
 * Attractions are specific instances of Location; they have a
 * puzzle defined for them.
 *
 * Created by jett on 3/23/19.
 */
@Injectable()
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
  featuredImageUrl?: string;
  featuredImage: Image;
  establishmentId?: number;
  readinessLevel: string;
  isLast?: boolean;
  isCurrent?: boolean;
}
