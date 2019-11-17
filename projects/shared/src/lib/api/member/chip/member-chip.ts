import {Component, Input} from '@angular/core';
import {Member} from '../member';

/**
 * Depicts a given Member in a concise component.
 */
@Component({
  // TODO: CI-11 Synch this up with the clients of this component.
  // selector: 'member-chip',
  selector: 'cr-member-chip',
  templateUrl: 'member-chip.html'
})
export class MemberChipComponent {

  @Input() member: Member;

  constructor() {
  }

}
