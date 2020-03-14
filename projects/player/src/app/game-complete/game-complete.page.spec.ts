import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameCompletePage } from './game-complete.page';

describe('GameCompletePage', () => {
  let component: GameCompletePage;
  let fixture: ComponentFixture<GameCompletePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameCompletePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
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
