import {
  Component,
  OnInit
} from '@angular/core';
import {ProfileService} from '../../profile/profile.service';
import {Member} from '../member';

/**
 * Summary presentation for a Member instance.
 */
@Component({
  selector: 'cr-profile-summary',
  templateUrl: 'profile-summary.html',
  styleUrls: ['profile-summary.scss']
})
export class ProfileSummaryComponent implements OnInit {

  profile: Member;

  constructor(
    private profileService: ProfileService,
  ) {}

  ngOnInit(): void {
    this.profileService.loadMemberProfile().subscribe(
      (member) => {
        this.profile = member;
      }
    );
  }

}
