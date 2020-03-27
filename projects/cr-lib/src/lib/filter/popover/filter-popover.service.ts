import {Injectable} from '@angular/core';
import {FilterPopoverComponent} from './popover.component';
import {PopoverController} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class FilterPopoverService {

  private currentPopover = null;

  constructor(
    private popoverController: PopoverController,
  ) { }

  async showFilter(event: Event) {
    console.log('Filter Attractions');
    let popover = await this.popoverController.create({
      component: FilterPopoverComponent,
      event: null,
      translucent: true
    });
    this.currentPopover = popover;
    return popover.present();
  }

}
