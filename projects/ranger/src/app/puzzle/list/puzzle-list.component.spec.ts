import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {
  async,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';
import {ModalController} from '@ionic/angular';
import {
  Puzzle,
  PuzzleService
} from 'cr-lib';
import {of} from 'rxjs';
import {PuzzleListComponent} from './puzzle-list.component';

describe('PuzzleListComponent', () => {
  let component: PuzzleListComponent;
  let fixture: ComponentFixture<PuzzleListComponent>;

  const modalSpy = jasmine.createSpyObj('ModalController', ['get']);
  const puzzleSpy = jasmine.createSpyObj('PuzzleService', ['getPuzzles']);

  beforeEach(async(() => {
    puzzleSpy.getPuzzles = jasmine.createSpy('getPuzzles').and.returnValue(of([new Puzzle()]));
    TestBed.configureTestingModule({
      declarations: [ PuzzleListComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {provide: ModalController, useValue: modalSpy},
        {provide: PuzzleService, useValue: puzzleSpy},
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PuzzleListComponent);
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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
