import {Component, Input} from '@angular/core';
import {LocationType} from '../loc-type';

/**
 * Presents the given Location Type as a chip.
 */
@Component({
  // TODO: CI-11 Find spots where this had been referenced.
  // selector: 'loc-type-chip',
  selector: 'cr-loc-type-chip',
  templateUrl: 'loc-type-chip.html'
})
export class LocTypeChipComponent {

  /* Assigned by client of this component. */
  @Input() locType: LocationType;

  constructor() {}

}
