import {AfterViewInit, Component} from '@angular/core';
import {NavController} from '@ionic/angular';
// import {OutingPage} from '../outing/outing';
import {OutingService, Outing} from 'cr-lib';
import {Subscription} from 'rxjs';

/**
 * Displays selected details from the Outing sufficient for the player to know
 * where to be and when the game starts.
 *
 * Also provides links to more information about the course and a button to bring
 * up the full Outing Page.
 */
@Component({
  selector: 'outing-summary',
  templateUrl: 'outing-summary.html'
})
export class OutingSummaryComponent
implements AfterViewInit {

  outing: Outing;
  outingTense: 'past' | 'present' | 'future';
  private outingSubscription: Subscription;

  constructor(
    public navCtrl: NavController,
    private outingService: OutingService,
  ) {
    this.outing = {} as any;
    this.outingTense = 'present';
  }

  ngAfterViewInit() {
    this.outingSubscription = this.outingService.getSessionOuting().subscribe(
      (response) => {
        this.outing = response;
        const today = new Date();
        const scheduledDate = new Date(this.outing.scheduledTime);
        if (scheduledDate.getDay() === today.getDay()) {
          this.outingTense = 'present';
        } else if (scheduledDate > today) {
          this.outingTense = 'future';
        } else if (scheduledDate < today) {
          this.outingTense = 'past';
        }
      }
    );
  }

  public viewDetails() {
    // TODO: CI-10 Hook into routing:
    // this.navCtrl.push(OutingPage);
  }

  ngOnDestroy() {
    this.outingSubscription.unsubscribe();
  }

}
