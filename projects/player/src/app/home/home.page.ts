import { Component } from '@angular/core';
import {Member} from '../../../../shared/src/lib/api/member/member';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  member: Member;

  constructor() {}

}
