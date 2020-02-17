import {
  Component,
  OnInit
} from '@angular/core';
import {AppVersion} from '@ionic-native/app-version/ngx';
import {
  PlatformStateService,
  ProfileService
} from 'cr-lib';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {

  /* Public members. */
  readonly about: {version: string} = {version: ''};
  /* Values here are replaced at build time by cordova's `before_prepare` script. */
  readonly buildDate: string = 'BUILD_DATE';
  readonly gitSha: string = 'GIT_VERSION_STRING';

  constructor(
    private readonly appVersion: AppVersion,
    public readonly platform: PlatformStateService,
    public readonly memberService: ProfileService,
  ) {
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutPage');
  }

}
