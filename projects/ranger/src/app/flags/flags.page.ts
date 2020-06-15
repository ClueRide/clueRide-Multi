import {
  Component,
  OnInit
} from '@angular/core';
import {Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {
  Attraction,
  CategoryAttractionService
} from 'cr-lib';

@Component({
  selector: 'app-flags',
  templateUrl: './flags.page.html',
  styleUrls: ['./flags.page.scss'],
})
export class FlagsPage implements OnInit {

  private subscription: Subscription;
  public attraction: Attraction;

  constructor(
    private activatedRoute: ActivatedRoute,
    private categoryAttractionService: CategoryAttractionService,
  ) { }

  ngOnInit() {
    this.subscription = this.activatedRoute.queryParams.subscribe(
      (params) => {
        const attractionId = parseInt(this.activatedRoute.snapshot.paramMap.get('id'), 10);
        console.log('AttractionPage.ngOnInit; attractionId = ', attractionId);
        this.attraction = this.categoryAttractionService.getAttraction(
          attractionId
        );
      });
  }

}
