import {HttpClient} from '@angular/common/http';
import {Component} from '@angular/core';
import {
  async,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';
import {
  MemberChipComponentModule,
  ProfileService
} from 'cr-lib';
import {of} from 'rxjs';
import {LoadStateService} from '../state/load/load-state.service';

import {HomePage} from './home.page';

@Component({selector: 'outing-summary', template: ''})
class OutingSummaryComponent {}

@Component({selector: 'app-show-game', template: ''})
class ShowGameComponent {}

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  let loadMemberProfileSpy;

  beforeEach(async(() => {
    const httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    const loadStateSpy = jasmine.createSpyObj('LoadStateService', ['loadOutingData']);
    const profileSpy = jasmine.createSpyObj('ProfileService', ['loadMemberProfile']);
    loadMemberProfileSpy = profileSpy.loadMemberProfile.and.returnValue(of ({}));

    TestBed.configureTestingModule({
      declarations: [
        HomePage,
        OutingSummaryComponent,
        ShowGameComponent
      ],
      imports: [
        IonicModule.forRoot(),
        MemberChipComponentModule,
      ],
      providers: [
        HomePage,
        {provide: HttpClient, useValue: httpClientSpy},
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
