import {
  Component,
  Input,
  OnInit
} from '@angular/core';
import {Attraction} from '../attraction';

@Component({
  selector: 'app-attraction-icon',
  templateUrl: './attraction-icon.component.html',
  styleUrls: ['./attraction-icon.component.scss'],
})
export class AttractionIconComponent implements OnInit {

  @Input() attraction: Attraction;

  constructor() { }

  ngOnInit() {}

}
