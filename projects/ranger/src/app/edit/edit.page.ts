import {
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import {Subscription} from 'rxjs';
import {ActiveAttractionService} from './active-attraction.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPageComponent implements OnInit, OnDestroy {

  /* Exposed to allow the tabs to pass along which Attraction is being worked. */
  public attractionId: number;
  private subscription: Subscription;

  constructor(
    private activeAttractionService: ActiveAttractionService
  ) {
  }

  ngOnInit() {
    this.subscription = this.activeAttractionService.getActiveAttractionId()
      .subscribe(
        (id) => {
          this.attractionId = id;
          console.log('Edit Page receiving attractionId', this.attractionId);
        }
      );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
