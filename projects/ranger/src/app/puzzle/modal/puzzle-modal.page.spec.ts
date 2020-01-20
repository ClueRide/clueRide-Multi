import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {
  async,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';
import {ModalController} from '@ionic/angular';
import {PuzzleService} from 'cr-lib';

import {PuzzleModalPage} from './puzzle-modal.page';

describe('PuzzleModalPage', () => {
  let component: PuzzleModalPage;
  let fixture: ComponentFixture<PuzzleModalPage>;

  const puzzleSpy = jasmine.createSpyObj('PuzzleService', ['get']);
  const modalSpy = jasmine.createSpyObj('ModalController', ['get']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PuzzleModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        PuzzleModalPage,
        {provide: PuzzleService, useValue: puzzleSpy},
        {provide: ModalController, useValue: modalSpy},
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PuzzleModalPage);
    component = fixture.componentInstance;
    component.attraction = {
      id: 123,
      name: 'Test Name',
      nodeId: 234,
      readinessLevel: 'DRAFT',
      latLon: null,
      locationTypeId: 4,
      featuredImage: null
    };
    component.puzzle = {
      id: 1,
      name: 'Test Puzzle',
      locationId: 42,
      locationName: 'Test Name',
      question: 'Q',
      answers: [],
      correctAnswer: undefined,
      points: 15
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
