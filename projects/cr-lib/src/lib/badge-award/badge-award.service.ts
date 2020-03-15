import {Injectable} from '@angular/core';
import {Subscription} from "rxjs";
import {ServerEventsService} from "../sse-event/sse-event.service";
import {
  PopoverController,
  ToastController
} from "@ionic/angular";
import {BadgeEvent} from "../sse-event/badge-event";
import {BadgeAwardComponent} from "./badge-award.component";

@Injectable({
  providedIn: 'root'
})
export class BadgeAwardService {
  private subscription: Subscription;

  constructor(
    private sseService: ServerEventsService,
    private popoverController: PopoverController,
    private toastController: ToastController
  ) {
  }

  /**
   * Invoked by application when it is ready to pay attention to Badge Award events.
   */
  public initializeSubscription(): void {
    this.subscription = this.sseService.getBadgeEventObservable().subscribe(
      (badgeAwardEvent: BadgeEvent) => {
        this.showBadgeAward(
          badgeAwardEvent
        ).then(
        ).catch(
          (error) => console.log ('rut roh', error)
        );
      }
    );
  }

  async showBadgeAward(badgeAwardEvent: BadgeEvent) {
    const popover = await this.popoverController.create({
      component: BadgeAwardComponent,
      animated: true,
      showBackdrop: true,
      translucent: true,
      cssClass: "badge-popover",
      componentProps: {
        badgeEvent: badgeAwardEvent
      }
    });

    const toast = await this.toastController.create({
      message: 'Tap the badge to open the details page in another tab.',
      duration: 3500,
      color: "dark"
    });
    toast.present();
    return await popover.present();
  }

}
