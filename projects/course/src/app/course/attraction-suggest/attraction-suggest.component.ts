import {
  Component,
  Input,
  OnInit,
  ViewChild
} from '@angular/core';
import {
  Attraction,
  AttractionByPathService,
  AttractionService,
  Course,
} from 'cr-lib';
import {IonSearchbar} from '@ionic/angular';

@Component({
  selector: 'app-attraction-suggest',
  templateUrl: './attraction-suggest.component.html',
  styleUrls: ['./attraction-suggest.component.scss'],
})
export class AttractionSuggestComponent implements OnInit {

  @Input() course: Course;
  @ViewChild('nameSearch', {static: false}) nameSearchBar: IonSearchbar;

  /* Declare the variable (in this case and initialize it with false). */
  isItemAvailable = false;

  public attractions: Attraction[] = [];

  constructor(
    private attractionService: AttractionService,
    private attractionByPathService: AttractionByPathService,
  ) { }

  ngOnInit() {}

  getItems(ev: any) {

    /* The fragment to filter by. */
    const nameFragment = ev.target.value;

    if (nameFragment && nameFragment.trim() !== '') {
      this.isItemAvailable = true;
      this.attractionService.suggestAttractions(nameFragment).subscribe(
        (attractions: Attraction[]) => this.attractions = attractions
      );
    } else {
      this.isItemAvailable = false;
    }
  }

  useAttraction(attraction: Attraction): void {
    this.isItemAvailable = false;
    this.nameSearchBar.value = '';
    this.attractionByPathService.addAttractionToCourse(attraction, this.course);
  }

}
