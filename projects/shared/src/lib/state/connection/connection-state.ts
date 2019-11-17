import { Component } from '@angular/core';
import {EventSourcePolyfill} from 'ng-event-source';
import {SseEventService} from '../../sse-event/sse-event.service';

/**
 * Reports on the status of the Event Source setup by our SSE Event Service.
 */
@Component({
  // TODO: CI-11 Update references to this component's selector.
  // selector: 'connection-state',
  selector: 'cr-connection-state',
  templateUrl: 'connection-state.html'
})
export class ConnectionStateComponent {

  private eventSource: EventSourcePolyfill;

  constructor(
    sseEventService: SseEventService
  ) {
    console.log('Hello ConnectionStateComponent Component');
    this.eventSource = sseEventService.getEventSource();
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
