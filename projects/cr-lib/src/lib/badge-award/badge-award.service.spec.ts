import { TestBed } from '@angular/core/testing';

import { BadgeAwardService } from './badge-award.service';
import {ServerEventsService} from "../sse-event/sse-event.service";
import {
  PopoverController,
  ToastController
} from "@ionic/angular";

const sseSpy = jasmine.createSpyObj('ServerEventsService', ['get']);
const popoverControllerSpy = jasmine.createSpyObj('PopoverController', ['present']);
const toastControllerSpy = jasmine.createSpyObj('ToastController', ['present']);

describe('BadgeAwardService', () => {
  let toTest: BadgeAwardService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BadgeAwardService,
        {provide: ServerEventsService, useValue: sseSpy},
        {provide: PopoverController, useValue: popoverControllerSpy},
        {provide: ToastController, useValue: toastControllerSpy},
      ]
    });

    toTest = TestBed.get(BadgeAwardService);
  });

  it('should be created', () => {
    expect(toTest).toBeTruthy();
  });

});
