import {
  inject,
  TestBed
} from '@angular/core/testing';

import {OutingPageGuard} from './outing-page.guard';

describe('OutingPageGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OutingPageGuard]
    });
  });

  it('should ...', inject([OutingPageGuard], (guard: OutingPageGuard) => {
    expect(guard).toBeTruthy();
  }));
});
