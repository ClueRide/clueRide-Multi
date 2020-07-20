export class Course {
  id: number;
  name: string;
  description: string;
  url: string;
  courseTypeId: string;
  pathIds: number[];
  locationIds?: number[];
  departure: string;
  destination: string;
}
