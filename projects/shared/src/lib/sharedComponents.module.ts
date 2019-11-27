import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';

import {BadgeSummaryComponent} from '../../../cr-lib/src/lib/api/badge/summary/badge-summary';
import {BadgesPerLevelComponent} from '../../../cr-lib/src/lib/api/badges-per-level/badges-per-level';
import {MemberChipComponent} from '../../../cr-lib/src/lib/api/member/chip/member-chip';
import {ProgressChipComponent} from '../../../cr-lib/src/lib/api/progress-chip/progress-chip';

// import {BeginGameComponent} from './begin-game/begin-game';
// import {InviteListComponent} from './invite-list/invite-list';
// import {OutingSummaryComponent} from './outing-summary/outing-summary';
// import {PinnedMapComponent} from './pinned-map/pinned-map';
// import {ProfileSummaryComponent} from './profile-summary/profile-summary';
// import { RegisteredAsComponent } from './registered-as/registered-as';
// import { NewBadgePopupComponent } from './new-badge-popup/new-badge-popup';
// import { PopupMonitorComponent } from './popup-monitor/popup-monitor';

@NgModule({
  declarations: [
    // OutingSummaryComponent,
    BadgesPerLevelComponent,
    BadgeSummaryComponent,
    // BeginGameComponent,
    // InviteListComponent,
    MemberChipComponent,
    // PinnedMapComponent,
    // ProfileSummaryComponent,
    ProgressChipComponent,
    // RegisteredAsComponent,
    // NewBadgePopupComponent,
    // PopupMonitorComponent,
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    // OutingSummaryComponent,
    BadgeSummaryComponent,
    BadgesPerLevelComponent,
    // BeginGameComponent,
    // InviteListComponent,
    MemberChipComponent,
    // PinnedMapComponent,
    // ProfileSummaryComponent,
    ProgressChipComponent,
    // RegisteredAsComponent,
    // NewBadgePopupComponent,
    // PopupMonitorComponent,
  ]
})

export class SharedComponentsModule {}
