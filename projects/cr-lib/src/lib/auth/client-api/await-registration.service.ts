import {Injectable} from '@angular/core';
import {NavController} from '@ionic/angular';
import {Observable, Subject} from 'rxjs';
import {filter, find} from 'rxjs/operators';
import {RegStateKey} from '../state/reg-state-key';
import {RegStateService} from '../state/reg-state.service';

/**
 * Provides registration services for a client application.
 */
@Injectable({
  providedIn: 'root'
})
export class AwaitRegistrationService {
  // TODO: Determine what we want to return when we're registered. (boolean vs RegState)
  private registrationActiveSubject: Subject<any>;

  constructor(
    private regStateService: RegStateService,
    private nav: NavController
  ) {
    this.registrationActiveSubject = new Subject();
  }

  /**
   * Triggers the check of a Registration State to make sure our Access Token is ready.
   *
   * If registration/confirmation are required, we provide the pages via routes setup within this module.
   * Those pages will feed back into changes of the Registration State that we pick up via the stream.
   * Once the registration is active, we notify the client via the
   * Observable returned by this function.
   *
   * @param appScheme represents the url that identifies the application to the Auth back-end.
   */
  public getRegistrationActiveObservable(
    appScheme: string
  ): Observable<any> {

    const regStateObservable = this.regStateService.requestRegState(
      appScheme
    );

    /* Handle Registration -- generally, a one-time occurrence, but there are re-tries. */
    regStateObservable.pipe(
      filter(regState => regState.state === RegStateKey.REGISTRATION_REQUIRED)
    ).subscribe(() => {
      console.log('We need to show the Registration Page');
      this.nav.navigateRoot('reg-register')
        .then()
        .catch(error => console.error('Did not get Registration Page', error));
    });

    /* Handle Profile Confirmation -- generally, a one-time occurrence, but there are re-tries. */
    regStateObservable.pipe(
      filter(regState => regState.state === RegStateKey.CONFIRMATION_REQUIRED)
    ).subscribe(() => {
        console.log('We need to show the Confirmation Page');
        this.nav.navigateRoot('reg-confirm')
          .then()
          .catch(error => console.error('Did not get Registration Page', error));
      }
    );

    /* Handle Active Session -- typical case. */
    regStateObservable.pipe(
      find(regState => regState.state === RegStateKey.ACTIVE)
    ).subscribe(regState => {
      console.log('Active by the grace of', regState.source );
      /* Proceed with the application. */
      this.registrationActiveSubject.next(true);
    });

    return this.registrationActiveSubject.asObservable();
  }

}
