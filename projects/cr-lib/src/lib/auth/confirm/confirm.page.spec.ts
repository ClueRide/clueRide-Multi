import {
  async,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';
import {Member} from '../../api/member/member';
import {ProfileService} from '../../api/profile/profile.service';
import {RegStateService} from '../state/reg-state.service';

import {ConfirmPage} from './confirm.page';

const regStateSpy = jasmine.createSpyObj('RegStateService', ['get']);
const profileSpy = jasmine.createSpyObj('ProfileService', ['getMemberFromToken']);

describe('ConfirmPage', () => {
  let component: ConfirmPage;
  let fixture: ComponentFixture<ConfirmPage>;
  profileSpy.getMemberFromToken = jasmine.createSpy('getMemberFromToken').and.returnValue(new Member())

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmPage ],
      imports: [IonicModule],
      providers: [
        ConfirmPage,
        {provide: RegStateService, useValue: regStateSpy},
        {provide: ProfileService, useValue: profileSpy},
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
