import {EditService} from './edit.service';

const locationSpy = jasmine.createSpyObj('LocationService', ['update', 'delete']);
const mapDataSpy = jasmine.createSpyObj('MapDataService', ['updateAttraction', 'deleteAttraction']);
const navCtrlSpy = jasmine.createSpyObj('NavController', ['back']);

describe('EditService', () => {
  let toTest: EditService;

  beforeEach(() => {
    toTest = new EditService(
      locationSpy,
      mapDataSpy,
      navCtrlSpy
    );
  });

  it('should be created', () => {
    expect(toTest).toBeTruthy();
  });

});
