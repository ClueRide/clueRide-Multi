import {HomeGuard} from './home.guard';

const awaitRegistrationSpy = jasmine.createSpyObj('AwaitRegistrationService', ['getRegistrationActiveObservable']);

describe('HomeGuard', () => {
  let toTest: HomeGuard;

  beforeEach(() => {
    toTest = new HomeGuard(awaitRegistrationSpy);
  });

  it('should be created', () => {
    expect(toTest).toBeTruthy();
  });

});
