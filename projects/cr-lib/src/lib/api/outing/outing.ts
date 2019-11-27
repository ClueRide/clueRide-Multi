import {LatLon} from '../../domain/lat-lon/lat-lon';

export class Outing {
  id: number;
  scheduledTime: Date;
  startingLocationId: number;
  startPin: LatLon;
  courseName: string;
  courseDescription: string;
  courseUrl: string;
  guideName: string;
  guideMemberId: number;
  teamId: number;
  teamName: string;
}
