import {
  Component,
  OnInit
} from '@angular/core';
import {Team} from 'cr-lib';
import {GuideEventService} from '../state/guide-event.service';

/**
 * Presents the list of Team Members for the current outing.
 */
@Component({
  selector: 'app-team',
  templateUrl: './team.page.html',
  styleUrls: ['./team.page.scss'],
})
export class TeamPage implements OnInit {

  public team: Team;

  constructor(
    private guideEventService: GuideEventService
  ) {
    this.team = {
      id: 1,
      name: 'A-Team',
      members: []
    };
  }

  ngOnInit() {
  }

  public canSignalTeamAssembled(): boolean {
    return this.guideEventService.isCurrentMemberGuide();
  }

  signalTeamAssembled() {
    this.guideEventService.sendTeamAssembled();
  }

}
