import {Component, Input} from '@angular/core';
import {BadgeProgress} from '../badge-progress/badge-progress';

/**
 * Presents succinct progress on a given badge.
 */
@Component({
  selector: 'cr-progress-chip',
  templateUrl: 'progress-chip.html'
})
export class ProgressChipComponent {

  @Input() chip: BadgeProgress;

  constructor() {
    console.log('Hello ProgressChipComponent Component');
  }

}
