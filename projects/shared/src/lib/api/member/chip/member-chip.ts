import {Component, Input} from '@angular/core';
import {Member} from '../member';

/**
 * Depicts a given Member in a concise component.
 */
@Component({
  selector: 'cr-member-chip',
  templateUrl: 'member-chip.html',
  styleUrls: ['member-chip.scss']
})
export class MemberChipComponent {

  @Input() member: Member;

  constructor() {
  }

}
