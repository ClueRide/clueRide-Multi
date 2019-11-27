import {NgModule} from '@angular/core';
import {OutingService} from './outing/outing.service';

@NgModule({
  declarations: [
  ],
  imports: [
    OutingService
  ],
  exports: [
    OutingService
  ]
})

export class SharedServiceModule {}
