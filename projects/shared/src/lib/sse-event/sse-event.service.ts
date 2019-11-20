import {EventSourcePolyfill} from 'ng-event-source';
import {HttpClient} from '@angular/common/http';
import {HttpService, SSE_EVENT_BASE_URL} from '../api/http/http.service';
import {Injectable} from '@angular/core';
import {TokenService} from '../auth/token/token.service';

/**
 * Handles subscriptions to the SSE Server.
 *
 * Further details on the Wiki: http://bikehighways.wikidot.com/server-sent-events.
 */
@Injectable()
export class SseEventService {

  /* Lazy init. */
  static eventSource: EventSourcePolyfill = null;

  constructor(
    public http: HttpClient,
    public httpService: HttpService,
    private tokenService: TokenService,
  ) {
    console.log('Hello SseEventService Provider');
  }

  getEventSource(): EventSourcePolyfill {
    if (SseEventService.eventSource == null) {
      SseEventService.eventSource = this.initializeEventSource();
    }
    return SseEventService.eventSource;
  }

  /**
   * Invoked to prepare connection to SSE Server and begin emitting
   * the events that come in on that channel.
   */
  initializeEventSource(): EventSourcePolyfill {
    const bearerToken = this.tokenService.getBearerToken();
    return new EventSourcePolyfill(
      SSE_EVENT_BASE_URL + 'sse-channel',
      {
        headers: {
          Authorization: `Bearer ${bearerToken}`
        }
      }
    );
  }

}
