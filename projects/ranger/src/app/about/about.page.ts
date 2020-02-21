import {
  Component,
  OnInit
} from '@angular/core';
import {AppVersion} from '@ionic-native/app-version/ngx';
import {PlatformStateService} from 'cr-lib';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {

  readonly about: {version: string} = {version: ''};
  readonly gitSha: string;
  readonly buildDate: string;

  constructor(
    private readonly appVersion: AppVersion,
    public readonly platform: PlatformStateService,
  ) {
    this.gitSha = environment.build.gitSha;
    this.buildDate = environment.build.date;
  }

  ngOnInit(): void {
    /* Retrieve the Version information if we have Cordova available. */
    if (this.platform.isNativeMode()) {
      this.appVersion.getVersionNumber()
        .then(
          (version) => {
            console.log('Able to retrieve Version info.');
            this.about.version = version;
          },
          (error) => {
            console.error(error);
          }
        );
    }
  }

}
