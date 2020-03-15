import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {
  async,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import {GameCompletePage} from './game-complete.page';
import {
  NavController,
  NavParams,
} from "@ionic/angular";

const navControllerSpy = jasmine.createSpyObj('NavController', ['navigateRoot']);

describe('GameCompletePage', () => {
  let component: GameCompletePage;
  let fixture: ComponentFixture<GameCompletePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameCompletePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        GameCompletePage,
        {provide: NavController, useValue: navControllerSpy}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameCompletePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
