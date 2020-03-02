import {LocationType} from '../loc-type/loc-type';
import {LocTypeMock} from '../loc-type/loc-type-mock';
import {Attraction} from './attraction';

export class AttractionMock {

  /**
   * Creates a single instance of an Attraction that has come from the back-end
   * (holds certain references rather than fully-populated).
   *
   * Location Type ID matches the Attraction ID for simplicity in creating these instances.
   *
   * @param inputId ID to use as the unique identifier for this instance.
   */
  static createAttractionMock(inputId: number): Attraction {
    return {
      id: inputId,
      name: 'Attraction-' + inputId,
      locationTypeId: inputId,
      latLon: {
        id: 0,
        lat: 34.56,
        lon: -81.72
      },
      nodeId: 1,
      featuredImage: null,
      readinessLevel: 'DRAFT',
    };
  }

  /**
   * Creates a set of 5 Attractions with sequential IDs.
   */
  static createAttractionMockSet(): Attraction[] {
    const attraction1 = AttractionMock.createAttractionMock(1);
    const attraction2 = AttractionMock.createAttractionMock(2);
    const attraction3 = AttractionMock.createAttractionMock(3);
    const attraction4 = AttractionMock.createAttractionMock(4);
    const attraction5 = AttractionMock.createAttractionMock(5);

    /* This couples the IDs from the LocTypeMock with this Mock. */
    const allLocTypes: LocationType[] = LocTypeMock.createLocTypeSet();

    attraction1.locationType = allLocTypes[0];
    attraction2.locationType = allLocTypes[1];
    attraction3.locationType = allLocTypes[2];
    attraction4.locationType = allLocTypes[3];
    attraction5.locationType = allLocTypes[4];

    return [
      attraction1,
      attraction2,
      attraction3,
      attraction4,
      attraction5
    ];
  }

}
