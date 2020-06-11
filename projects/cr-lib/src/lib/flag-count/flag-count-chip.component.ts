import {
  Component,
  Input,
  OnInit
} from '@angular/core';
import {Flag} from '../api/flag/flag';

@Component({
  selector: 'app-flag-count-chip',
  templateUrl: './flag-count-chip.component.html',
  styleUrls: ['./flag-count-chip.component.scss'],
})
export class FlagCountChipComponent implements OnInit {

  @Input() flags: Flag[];

  constructor() { }

  ngOnInit() {}

}
