import {Injectable} from '@angular/core';
import {Platform} from '@ionic/angular';
import {
  EventSourcePolyfill,
  OnMessageEvent
} from 'ng-event-source';
import {
  Observable,
  ReplaySubject,
  Subject
} from 'rxjs';
import {filter} from 'rxjs/operators';
import {ProfileService} from '../api/profile/profile.service';
import {AuthHeaderService} from '../auth/header/auth-header.service';
import {AnswerSummary} from './answer-summary/answer-summary';
import {BadgeEvent} from './badge-event';

// const gameStateUrl = 'http://sse.clueride.com/game-state-broadcast';
const gameStateUrl = 'http://sse.clueride.com/sse-channel';

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
  private eventSourceSubject: Subject<EventSourcePolyfill>;

  private answerSummary$: Subject<AnswerSummary>;
  readonly badgeEvent$: Subject<BadgeEvent>;
  private gameStateEvent$: Subject<any>;
  private tetherEvent$: Subject<OnMessageEvent>;

  constructor(
    private authHeaderService: AuthHeaderService,
    private profileService: ProfileService,
    private platform: Platform,
  ) {
    this.answerSummary$ = new ReplaySubject<AnswerSummary>(1);
    this.badgeEvent$ = new Subject<BadgeEvent>();
    this.gameStateEvent$ = new Subject<any>();
    this.tetherEvent$ = new Subject<OnMessageEvent>();
    this.eventSourceSubject = new ReplaySubject<EventSourcePolyfill>(1);
  }

  getEventSource(): Observable<EventSourcePolyfill> {
    return this.eventSourceSubject.asObservable();
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
      let eventSourceUrl = gameStateUrl + '/' + this.profileService.getBadgeOsId();
      /* Event Source may or may not be paying attention to a specific Outing. */
      if (outingId) {
        console.log('Opened against Outing ID', outingId);
        eventSourceUrl += '/' + outingId;
      } else {
        console.log('Opened against non-outing-specific messages');
      }

      this.eventSource = new EventSourcePolyfill(
        eventSourceUrl,
        {
          headers: this.authHeaderService.getAuthHeaders()
        }
      );

      /* This is the generic message type. */
      this.eventSource.onmessage = (
        (messageEvent: MessageEvent) => {
          const eventData = JSON.parse(messageEvent.data);
          console.log('SSE Message (type ' + messageEvent.type + '): ' + JSON.stringify(eventData));

          /* No longer expecting the generic 'message' type. */
          console.error('Unrecognized Message Type: ', messageEvent.type);
        }
      );

      /* Map each event type to the corresponding event queue. */
      this.eventSource.addEventListener('answer-summary',
        (messageEvent: MessageEvent) => {
          const event = JSON.parse(messageEvent.data);
          this.answerSummary$.next(event.answerSummary);
        });

      this.eventSource.addEventListener('badge-award',
        (messageEvent: MessageEvent) => {
          const event = JSON.parse(messageEvent.data);
          this.badgeEvent$.next(event);
        });

      this.eventSource.addEventListener('game-state',
        (messageEvent: MessageEvent) => {
          const event = JSON.parse(messageEvent.data);
          this.gameStateEvent$.next(event);
        });

      this.eventSource.addEventListener('tether',
        (messageEvent: MessageEvent) => {
          const event = JSON.parse(messageEvent.data);
          this.tetherEvent$.next(event);
        });

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

      /* Register to shutdown this channel when app is being paused. */
      /* For mobile devices: */
      this.platform.pause.subscribe(
        () => this.eventSource.close()
      );

      /* For Browsers. */
      window.addEventListener('beforeunload',
        () => this.eventSource.close()
      );

      /* Now that the polyfill is prepared, notify clients that may be waiting on it. */
      this.eventSourceSubject.next(this.eventSource);
    }

  }

  /**
   * Observable that streams the answer-summary events.
   */
  public getAnswerSummaryObservable(): Observable<AnswerSummary> {
    return this.answerSummary$.asObservable();
  }

  public getBadgeEventObservable(): Observable<BadgeEvent> {
    return this.badgeEvent$.pipe(
      filter(
        /* Check that this badge award is for this session's user. */
        (badgeEvent: BadgeEvent) => (badgeEvent.userId === this.profileService.getBadgeOsId())
      )
    );
  }

  /**
   * Observable that streams Game State events.
   */
  public getGameStateEventObservable(): Observable<any> {
    return this.gameStateEvent$.asObservable();
  }

}
