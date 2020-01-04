import {Injectable} from '@angular/core';
import {
  EventSourcePolyfill,
  OnMessageEvent
} from 'ng-event-source';
import {
  Observable,
  Subject
} from 'rxjs';
import {
  filter,
  map
} from 'rxjs/operators';
import {ProfileService} from '../api/profile/profile.service';
import {AuthHeaderService} from '../auth/header/auth-header.service';
import {AnswerSummary} from './answer-summary/answer-summary';
import {BadgeEvent} from './badge-event';

const gameStateUrl = 'http://sse.clueride.com/game-state-broadcast';

/**
 * Handles subscriptions to the SSE Server.
 *
 * Further details on the Wiki: http://bikehighways.wikidot.com/server-sent-events.
 */
@Injectable({
  providedIn: 'root'
})
export class ServerEventsService {

  private eventSource: EventSourcePolyfill;

  private answerSummary$: Subject<OnMessageEvent>;
  readonly badgeEvent$: Subject<string>;
  private gameStateEvent$: Subject<OnMessageEvent>;
  private tetherEvent$: Subject<OnMessageEvent>;

  constructor(
    private authHeaderService: AuthHeaderService,
    private profileService: ProfileService,
  ) {
    this.answerSummary$ = new Subject<OnMessageEvent>();
    this.badgeEvent$ = new Subject<string>();
    this.gameStateEvent$ = new Subject<OnMessageEvent>();
    this.tetherEvent$ = new Subject<OnMessageEvent>();
  }

  getEventSource(): EventSourcePolyfill {
    if (this.eventSource == null) {
      this.initializeSubscriptions(null);
    }
    return this.eventSource;
  }

  /**
   * Handles life-cycle for Game State events on the channel for the given Outing ID.
   *
   * TODO: It shouldn't be all messages:
   * All Messages are forwarded to the GameStateService for triggering UI changes.
   *
   * @param outingId the unique ID for the Outing we're paying attention to.
   */
  public initializeSubscriptions(outingId: number): void {

    if (!this.eventSource) {
      console.log('Opening Event Source');
      let eventSourceUrl = gameStateUrl;
      /* Event Source may or may not be paying attention to a specific Outing. */
      if (outingId) {
        eventSourceUrl += '/' + outingId;
      }

      this.eventSource = new EventSourcePolyfill(
        eventSourceUrl,
        {
          headers: this.authHeaderService.getAuthHeaders()
        }
      );

      /* All custom message types fire the `onmessage` event for our chosen EventSource polyfill. */
      this.eventSource.onmessage = (
        (messageEvent: MessageEvent) => {
          console.log('SSE Message (type ' + messageEvent.type + '): ' + JSON.stringify(messageEvent.data));
          /* Handle the various Named Messages. */
          if (messageEvent.type === 'tether') {
            this.tetherEvent$.next(messageEvent);
          } else if (messageEvent.type === 'message' || messageEvent.type === 'game_state') {
            this.gameStateEvent$.next(messageEvent);
          } else if (messageEvent.type === 'badge-award') {
            this.badgeEvent$.next(messageEvent.data);
          } else if (messageEvent.type === 'answer-summary') {
            this.answerSummary$.next(messageEvent);
          } else {
            console.error('Unrecognized Message Type: ', messageEvent.type);
          }
        }
      );

      this.eventSource.onopen = (
        (openEvent) => {
          console.log('SSE Open: ' + JSON.stringify(openEvent));
        }
      );

      this.eventSource.onerror = (
        (error) => {
          console.log('SSE Error: ' + JSON.stringify(error));
        }
      );

    }

  }

  /**
   * Observable that streams the answer-summary events.
   */
  public getAnswerSummaryObservable(): Observable<AnswerSummary> {
    return this.answerSummary$.pipe(
      map(event => {
        return JSON.parse(event.data).answerSummary;
      })
    );
  }

  public getBadgeEventObservable(): Observable<BadgeEvent> {
    return this.badgeEvent$.pipe(
      map(eventData => {
        return JSON.parse(eventData);
      }),
      filter(
        /* Check that this badge award is for this session's user. */
        badgeEvent => (badgeEvent.userId === this.profileService.getBadgeOsId()))
      );
  }

  /**
   * Observable that streams Game State events.
   */
  public getGameStateEventObservable(): Observable<any> {
    return this.gameStateEvent$.pipe(
      map( event => JSON.parse(event.data))
    );
  }

}
