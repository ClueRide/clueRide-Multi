import {Component} from '@angular/core';
import {PopoverController} from '@ionic/angular';
import {EdgeService} from 'cr-lib';

@Component({
  selector: 'app-edge',
  templateUrl: './edge.component.html',
  styleUrls: ['./edge.component.scss'],
})
export class EdgeComponent {

  private popover;

  constructor(
    public edgeService: EdgeService,
    public popoverController: PopoverController
  ) {}

  async presentPopover(linkPath: any) {
    this.popover = await this.popoverController.create({
      component: EdgeComponent,
      event: linkPath,
      translucent: true
    });
    return await this.popover.present();
  }

  public handleFileInput(files: FileList) {
    this.edgeService.setFileToUpload(files.item(0));
  }

  public isFileSelected(): boolean {
    return this.edgeService.hasFileToUpload();
  }

  public upload() {
    this.edgeService.postGpxEdgeFile().subscribe(
      (edge: any) => {
        this.popover.dismiss().then(() => {this.popover = null});
      }
    );
  }

  public cancel() {
    this.popover.dismiss().then(() => {this.popover = null});
  }

}
