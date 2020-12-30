import {Component} from '@angular/core';
import {EventSourcePolyfill} from 'ng-event-source';
import {ServerEventsService} from '../../sse-event/sse-event.service';
import {PopoverController} from '@ionic/angular';
import {ConnectionExplainPage} from './explain/connection-explain.page';

/**
 * Reports on the status of the Event Source setup by our SSE Event Service.
 */
@Component({
  selector: 'cr-connection-state',
  templateUrl: 'connection-state.html',
  styleUrls: ['connection-state.scss']
})
export class ConnectionStateComponent {

  private eventSource: EventSourcePolyfill;
  private currentPopover = null;

  constructor(
    private popoverController: PopoverController,
    private serverEventsService: ServerEventsService
  ) {
    console.log('Hello ConnectionStateComponent: Requesting SSE EventSource');
    serverEventsService.getEventSource().subscribe(
      (eventSource) => this.eventSource = eventSource
    );
  }

  /**
   * This is used to tell if we've yet received the EventSource Polyfill.
   */
  public haveEventSource(): boolean {
    return !!this.eventSource;
  }

  /**
   * True if the current SSE event channel is open.
   */
  public isOpen(): boolean {
    return this.haveEventSource() && this.eventSource.readyState === this.eventSource.OPEN;
  }

  /**
   * True if the current SSE event channel is attempting to reconnect.
   */
  public isConnecting(): boolean {
    return this.haveEventSource() && this.eventSource.readyState === this.eventSource.CONNECTING;
  }

  /**
   * True if the current SSE event channel is closed or not yet opened.
   */
  public isClosed(): boolean {
    return !this.haveEventSource() || this.eventSource.readyState === this.eventSource.CLOSED;
  }

  public async showExplainPopover() {
    console.log('ConnectionState.showExplainPopover()');

    let popover = await this.popoverController.create({
      component: ConnectionExplainPage,
      event: null,
      translucent: true,
      cssClass: "connection-explain-popover"
    });
    this.currentPopover = popover;
    return popover.present();
  }

  /** @deprecated - May no longer be useful for testing */
  public toggleConnection() {
    /* Useful for testing within a browser. */
    this.serverEventsService.toggleConnection();
  }

}
