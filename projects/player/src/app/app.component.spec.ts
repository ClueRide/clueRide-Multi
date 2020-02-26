import {HttpClient} from '@angular/common/http';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {
  async,
  TestBed
} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {Platform} from '@ionic/angular';
import {
  AwaitRegistrationService,
  PlatformStateService,
  ProfileService
} from 'cr-lib';
import {of} from 'rxjs';

import {AppComponent} from './app.component';
import {AppStateService} from './state/app/app-state.service';
import {LoadStateService} from './state/load/load-state.service';

class MockBackButton {
  subscribeWithPriority: jasmine.Spy<any>;
}

class MockPlatform {
  ready: jasmine.Spy<any>;
  backButton: any;
}

describe('AppComponent', () => {

  let  mockBackButton,
    mockPlatform,
    checkInviteIsAcceptedSpy,
    getLoadStateObservableSpy,
    getRegistrationActiveObservableSpy,
    loadMemberProfileSpy;

  const appStateSpy = jasmine.createSpyObj('AppStateService', ['checkInviteIsAccepted']);
  const authClient = jasmine.createSpyObj('AwaitRegistrationService', {
    getRegistrationActiveObservable: () => of(true)
  });
  const loadStateSpy = jasmine.createSpyObj('LoadStateService', [
    'loadOutingData',
    'getLoadStateObservable'
  ]);
  const httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
  const statusBarSpy = jasmine.createSpyObj('StatusBar', ['styleDefault']);
  const splashScreenSpy = jasmine.createSpyObj('SplashScreen', ['hide']);
  const platformReadySpy = jasmine.createSpy().and.returnValue(Promise.resolve());
  const platformStateSpy = jasmine.createSpyObj('PlatformStateService', {
    isNativeMode: () => true
  });
  const profileSpy = jasmine.createSpyObj('ProfileService', ['loadMemberProfile']);

  beforeEach(async(() => {
    mockBackButton = new MockBackButton();
    mockBackButton.subscribeWithPriority = jasmine.createSpy('subscribeWithPriority', (priority, fn) => {});
    mockPlatform = new MockPlatform();
    mockPlatform.backButton = mockBackButton;
    mockPlatform.ready = platformReadySpy;

    getRegistrationActiveObservableSpy = authClient.getRegistrationActiveObservable.and.returnValue(of (true));
    loadMemberProfileSpy = profileSpy.loadMemberProfile.and.returnValue(of({}));
    checkInviteIsAcceptedSpy = appStateSpy.checkInviteIsAccepted.and.returnValue(Promise.resolve());
    getLoadStateObservableSpy = loadStateSpy.getLoadStateObservable.and.returnValue(of(true));

    TestBed.configureTestingModule({
      declarations: [AppComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: AppStateService, useValue: appStateSpy },
        { provide: AwaitRegistrationService, useValue: authClient },
        { provide: LoadStateService, useValue: loadStateSpy },
        { provide: Platform, useValue: mockPlatform },
        { provide: PlatformStateService, useValue: platformStateSpy },
        { provide: ProfileService, useValue: profileSpy },
        { provide: HttpClient, useValue: httpClientSpy },
        { provide: StatusBar, useValue: statusBarSpy },
        { provide: SplashScreen, useValue: splashScreenSpy },
      ],
      imports: [
        RouterTestingModule.withRoutes([])
      ],
    }).compileComponents();
  }));

  it('should create the app', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should initialize the app', async () => {
    TestBed.createComponent(AppComponent);
    expect(mockPlatform.ready).toHaveBeenCalled();
    await platformReadySpy;
    expect(statusBarSpy.styleDefault).toHaveBeenCalled();
    expect(splashScreenSpy.hide).toHaveBeenCalled();
  });

  it('should have menu labels', async () => {
    const fixture = await TestBed.createComponent(AppComponent);
    await fixture.detectChanges();
    const app = fixture.nativeElement;
    const menuItems = app.querySelectorAll('ion-label');
    expect(menuItems.length).toEqual(3);
    expect(menuItems[0].textContent).toContain('Home');
    expect(menuItems[1].textContent).toContain('Team');
    expect(menuItems[2].textContent).toContain('About');
  });

  it('should have urls', async () => {
    const fixture = await TestBed.createComponent(AppComponent);
    await fixture.detectChanges();
    const app = fixture.nativeElement;
    const menuItems = app.querySelectorAll('ion-item');
    expect(menuItems.length).toEqual(3);
    expect(menuItems[0].getAttribute('ng-reflect-router-link')).toEqual('/home');
    expect(menuItems[1].getAttribute('ng-reflect-router-link')).toEqual('/team');
    expect(menuItems[2].getAttribute('ng-reflect-router-link')).toEqual('/about');
  });

});
