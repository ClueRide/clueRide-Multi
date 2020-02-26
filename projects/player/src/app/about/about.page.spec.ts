import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {
  async,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';
import {AppVersion} from '@ionic-native/app-version/ngx';
import {
  PlatformStateService,
  ProfileService
} from 'cr-lib';

import {AboutPage} from './about.page';

describe('AboutPage', () => {
  let component: AboutPage;
  let fixture: ComponentFixture<AboutPage>;

  const appVersionSpy = jasmine.createSpyObj('AppVersion', ['get']);
  const platformSpy = jasmine.createSpyObj('PlatformStateService', ['isNativeMode']);
  const memberSpy = jasmine.createSpyObj('ProfileService', ['get']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {provide: AppVersion, useValue: appVersionSpy},
        {provide: PlatformStateService, useValue: platformSpy},
        {provide: ProfileService, useValue: memberSpy},
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
