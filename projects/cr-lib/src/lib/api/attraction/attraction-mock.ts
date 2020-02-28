import {Attraction} from './attraction';

export class AttractionMock {

  static createAttractionMock(inputId): Attraction {
    return {
      id: inputId,
      name: 'Attraction-' + inputId,
      locationTypeId: inputId + 10,
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

}
