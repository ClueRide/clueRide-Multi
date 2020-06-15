import {
  Component,
  Input,
  OnInit
} from '@angular/core';
import {Flag} from '../api/flag/flag';
import {FlagReason} from '../api/flag-reason/flag-reason.enum';

@Component({
  selector: 'app-flag-row',
  templateUrl: './flag-row.component.html',
  styleUrls: ['./flag-row.component.scss'],
})
export class FlagRowComponent implements OnInit {

  @Input() flag: Flag;
  public flagIconName: string;

  constructor() {
  }

  ngOnInit() {
    switch(this.flag.reason) {
      case FlagReason.SAFETY:
        this.flagIconName = 'traffic-cone';
        break;
      case FlagReason.ACCURACY:
        this.flagIconName = 'checkmark-circle';
        break;
      case FlagReason.FUN_FACTOR:
        this.flagIconName = 'party';
        break;
      case FlagReason.TIMELINESS:
        this.flagIconName = 'clock';
        break;
      default:
        this.flagIconName = 'question-mark';
        break;
  }
}

}
