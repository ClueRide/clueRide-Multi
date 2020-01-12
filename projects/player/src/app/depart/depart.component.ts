import {
  Component,
  OnInit
} from '@angular/core';
import {GuideEventService} from '../state/guide-event.service';

@Component({
  selector: 'app-depart',
  templateUrl: './depart.component.html',
  styleUrls: ['./depart.component.scss'],
})
export class DepartComponent implements OnInit {

  constructor(
    private guideEventService: GuideEventService
  ) { }

  ngOnInit() {}

  /** Check to see if we can provide Guide components. */
  public canSignalDeparture(): boolean {
    return this.guideEventService.isCurrentMemberGuide();
  }

  /** Guide is able to indicate that we're ready for the next Attraction. */
  signalDeparture() {
    this.guideEventService.sendDeparture();
  }

}
