import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

// import {BadgeSummaryComponent} from './badge-summary/badge-summary';
// import {BadgesPerLevelModule} from 'front-end-common';
// import {BeginGameComponent} from './begin-game/begin-game';
// import {InviteListComponent} from './invite-list/invite-list';
import {OutingSummaryComponent} from './outing-summary/outing-summary';
// import {PinnedMapComponent} from './pinned-map/pinned-map';
// import {ProfileSummaryComponent} from './profile-summary/profile-summary';
// import { ProgressChipComponent } from './progress-chip/progress-chip';
// import { RegisteredAsComponent } from './registered-as/registered-as';
// import { NewBadgePopupComponent } from './new-badge-popup/new-badge-popup';
// import { PopupMonitorComponent } from './popup-monitor/popup-monitor';

@NgModule({
  declarations: [
    OutingSummaryComponent,
    // BadgeSummaryComponent,
    // BeginGameComponent,
    // InviteListComponent,
    // PinnedMapComponent,
    // ProfileSummaryComponent,
    // ProgressChipComponent,
    // RegisteredAsComponent,
    // NewBadgePopupComponent,
    // PopupMonitorComponent,
  ],
  imports: [
    // BadgesPerLevelModule,
    CommonModule
  ],
  exports: [
    OutingSummaryComponent,
    // BadgeSummaryComponent,
    // BeginGameComponent,
    // InviteListComponent,
    // PinnedMapComponent,
    // ProfileSummaryComponent,
    // ProgressChipComponent,
    // RegisteredAsComponent,
    // NewBadgePopupComponent,
    // PopupMonitorComponent,
  ]
})

export class SummaryComponentsModule {}
