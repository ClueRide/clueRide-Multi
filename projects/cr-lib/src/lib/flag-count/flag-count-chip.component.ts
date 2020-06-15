import {
  Component,
  Input,
  OnInit
} from '@angular/core';
import {Flag} from '../api/flag/flag';
import {Router} from '@angular/router';

@Component({
  selector: 'app-flag-count-chip',
  templateUrl: './flag-count-chip.component.html',
  styleUrls: ['./flag-count-chip.component.scss'],
})
export class FlagCountChipComponent implements OnInit {

  @Input() flags: Flag[];
  @Input() attractionId: number;

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {}

  openFlagPageForAttraction(): void {
    this.router.navigate(
      ['flags', this.attractionId]
    ).then(() => console.log('Successful launch of Flags Page')
    ).catch( (error) => console.log('Failed to launch Flags Page', error)
    );
  }

}
