import {AfterContentInit, Component} from '@angular/core';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements AfterContentInit {

  constructor(
    private titleService: Title
  ) {}

  ngAfterContentInit(): void {
    this.titleService.setTitle('Home');
  }

}
