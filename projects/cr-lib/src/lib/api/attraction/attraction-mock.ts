import {Attraction} from './attraction';

export class AttractionMock {

  constructor() {}

  static createAttractionMock(inputId): Attraction {
    return {
      id: inputId,
      name: 'Attraction-' + inputId,
      locationTypeId: 1,
      latLon: null,
      nodeId: 1,
      featuredImage: null,
      readinessLevel: 'DRAFT',
    };
  }

}
