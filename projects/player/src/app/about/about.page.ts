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

  /* Public members. */
  readonly about: {version: string} = {version: ''};
  readonly buildDate: string;
  readonly gitSha: string;

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
            console.log('Able to retrieve Version info.', version);
            this.about.version = version;
          },
          (error) => {
            console.error(error);
          }
        );
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutPage');
  }

}
