import {Component, OnDestroy, OnInit} from '@angular/core';
import {NavController} from '@ionic/angular';
// import {OutingView} from '../../../../shared/src/lib/api/outing/outing-view';
import {Attraction, AttractionService, OutingService, OutingView} from 'shared';
// import {TeamPage} from '../team/team-page';
import {Title} from '@angular/platform-browser';
import {ReplaySubject, Subject} from 'rxjs';

/**
 * Orients players having accepted an invite by presenting an overview of the Outing.
 */

@Component({
  selector: 'page-outing',
  templateUrl: 'outing.html',
})
export class OutingPage implements OnInit, OnDestroy {

  outing: OutingView = new OutingView();
  startingAttractionSubject: Subject<Attraction>;

  constructor(
    private navCtrl: NavController,
    private titleService: Title,
    private outingService: OutingService,
    private attractionService: AttractionService,
  ) {
    this.startingAttractionSubject = new ReplaySubject<Attraction>(1);
  }

  ngOnInit(): void {
    this.outingService.getSessionOuting().subscribe(
      /* Generally, the Outing has been cached. */
      (response) => {
        console.log('Receiving Outing from Service');
        this.outing = response;

        /* With the outing, we can load the starting location. */
        this.startingAttractionSubject.next(
          this.attractionService.getAttraction(
            this.outing.startingLocationId
          )
        );

      }
    );
  }

  ionViewDidEnter() {
    this.titleService.setTitle('Outing');
  }

  public addToCalendar() {
    window.console.log('TODO: Download .ics file');
  }

  public showTeam() {
    // TODO: CI-10 Hook into routing:
    // this.navCtrl.push(TeamPage);
  }

  ngOnDestroy(): void {
  }

}
