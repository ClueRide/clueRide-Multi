import { Component } from '@angular/core';

/**
 * Presents a summary of the badge counts at each level.
 */
@Component({
  selector: 'cr-badges-per-level',
  templateUrl: 'badges-per-level.html',
  styleUrls: ['./badges-per-level.scss'],
})
export class BadgesPerLevelComponent {
  count = {
    aware: 3,
    adept: 1,
    advocate: 0,
    angel: 0
  };

  constructor() {
    console.log('Hello BadgesPerLevelComponent Component');
  }

}
