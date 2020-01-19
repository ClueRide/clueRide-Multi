import {
  async,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';
import {PlatformStateService} from '../../state/platform/platform-state.service';
import {RegStateService} from '../state/reg-state.service';

import {RegistrationPage} from './registration.page';

const regStateSpy = jasmine.createSpyObj('RegStateService', ['get']);
const platformStateSpy = jasmine.createSpyObj('PlatformStateService', ['get']);

describe('RegistrationPage', () => {
  let component: RegistrationPage;
  let fixture: ComponentFixture<RegistrationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrationPage ],
      imports: [IonicModule.forRoot()],
      providers: [
        RegistrationPage,
        {provide: RegStateService, useValue: regStateSpy},
        {provide: PlatformStateService, useValue: platformStateSpy},
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RegistrationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
