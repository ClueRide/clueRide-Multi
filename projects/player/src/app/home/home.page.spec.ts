import {Component} from '@angular/core';
import {
  async,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';
import {
  ConnectionStateModule,
  LoadStateService,
  MemberChipComponentModule,
  ProfileService
} from 'cr-lib';
import {of} from 'rxjs';

import {HomePage} from './home.page';

@Component({selector: 'outing-summary', template: ''})
class OutingSummaryComponent {}

@Component({selector: 'app-show-game', template: ''})
class ShowGameComponent {}

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  let loadMemberProfileSpy;

  const loadStateSpy = jasmine.createSpyObj('LoadStateService', ['loadOutingData']);
  const profileSpy = jasmine.createSpyObj('ProfileService', ['loadMemberProfile']);

  beforeEach(async(() => {
    loadMemberProfileSpy = profileSpy.loadMemberProfile.and.returnValue(of ({}));

    TestBed.configureTestingModule({
      declarations: [
        HomePage,
        OutingSummaryComponent,
        ShowGameComponent
      ],
      imports: [
        IonicModule.forRoot(),
        ConnectionStateModule,
        MemberChipComponentModule,
      ],
      providers: [
        HomePage,
        {provide: LoadStateService, useValue: loadStateSpy},
        {provide: ProfileService, useValue: profileSpy},
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
