import {MapPositionService} from './map-position.service';

const geoLocSpy = jasmine.createSpyObj('GeoLocService', ['get']);
const mapDragSpy = jasmine.createSpyObj('MapDragService', ['get']);

describe('MapPositionService', () => {
  let toTest: MapPositionService;

  beforeEach(() => {
      toTest = new MapPositionService(
        geoLocSpy,
        mapDragSpy
      );
    }
  );

  it('should be created', () => {
    expect(toTest).toBeTruthy();
  });

});
