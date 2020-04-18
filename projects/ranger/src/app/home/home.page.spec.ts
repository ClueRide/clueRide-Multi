import {Component} from '@angular/core';
import {
  async,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {HomePage} from './home.page';
import {MapPositionService} from '../map/position/map-position.service';

@Component({selector: 'cr-connection-state', template: ''})
export class ConnectionStateComponent {}

@Component({selector: 'cr-map', template: ''})
export class MapComponent {}

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  const mapPositionSpy = jasmine.createSpyObj('MapPositionService', ['getAttractionById']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HomePage,
        ConnectionStateComponent,
        MapComponent,
      ],
      imports: [
        IonicModule.forRoot(),
      ],
      providers: [
        HomePage,
        {provide: MapPositionService, useValue: mapPositionSpy},
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
