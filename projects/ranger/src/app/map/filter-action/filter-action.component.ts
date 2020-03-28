import {
  Component,
  OnInit
} from '@angular/core';

@Component({
  selector: 'app-filter-action',
  templateUrl: './filter-action.component.html',
  styleUrls: ['./filter-action.component.scss'],
})
export class FilterActionComponent implements OnInit {

  public expandedFlag: boolean = true;

  constructor() { }

  ngOnInit() {}

  showFilterToggle(event) {
    this.expandedFlag = !this.expandedFlag;
  }

}
