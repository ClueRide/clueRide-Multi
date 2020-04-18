import {FilterService} from './filter.service';

describe('FilterService', () => {
  let toTest: FilterService;

  beforeEach(() => {
    toTest = new FilterService();
  });

  it('should be created', () => {
    expect(toTest).toBeTruthy();
  });

});
