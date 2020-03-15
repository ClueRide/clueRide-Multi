import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BadgeAwardComponent } from './badge-award.component';
import {
  NavParams,
  PopoverController
} from "@ionic/angular";

const navParamsSpy = jasmine.createSpyObj('NavParams', ['get']);
const popoverControllerSpy = jasmine.createSpyObj('PopoverController', ['dismiss']);

describe('BadgeAwardComponent', () => {
  let component: BadgeAwardComponent;
  let fixture: ComponentFixture<BadgeAwardComponent>;

  beforeEach(async(() => {
    /* Setup NavParams response. */
    navParamsSpy.get = jasmine.createSpy( 'get').and.returnValue(
      {
        "userId": 47,
        "badgeFeatures": {
          "id": 1,
          "displayName": "Adept Seeker",
          "level": "ADEPT",
          "imageUrl": "https://clueride.com/wp-content/uploads/2019/07/df1bdd07bd7b0585e920c0debdc171cb.png",
          "criteriaUrl": "https://clueride.com/seeker/adept/"
        }
      }
    );

    TestBed.configureTestingModule({
      declarations: [ BadgeAwardComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        BadgeAwardComponent,
        {provide: NavParams, useValue: navParamsSpy},
        {provide: PopoverController, useValue: popoverControllerSpy},
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {

    fixture = TestBed.createComponent(BadgeAwardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
