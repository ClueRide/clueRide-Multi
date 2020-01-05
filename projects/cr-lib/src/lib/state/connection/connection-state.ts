import {Component} from '@angular/core';
import {EventSourcePolyfill} from 'ng-event-source';
import {ServerEventsService} from '../../sse-event/sse-event.service';

/**
 * Reports on the status of the Event Source setup by our SSE Event Service.
 */
@Component({
  selector: 'cr-connection-state',
  templateUrl: 'connection-state.html'
})
export class ConnectionStateComponent {

  private eventSource: EventSourcePolyfill;

  constructor(
    private serverEventsService: ServerEventsService
  ) {
    console.log('Hello ConnectionStateComponent: Obtaining SSE EventSource');
    this.eventSource = serverEventsService.getEventSource();
  }

  public isOpen(): boolean {
    return this.eventSource.readyState === this.eventSource.OPEN;
  }

  public isConnecting(): boolean {
    return this.eventSource.readyState === this.eventSource.CONNECTING;
  }

  public isClosed(): boolean {
    return this.eventSource.readyState === this.eventSource.CLOSED;
  }

}
