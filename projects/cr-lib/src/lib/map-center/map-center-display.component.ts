import {Component} from '@angular/core';
import * as L from 'leaflet';
import {Geoposition} from '@ionic-native/geolocation';
import {
  Observable,
  Subscription
} from 'rxjs';
import {LatLonService} from '../domain/lat-lon/lat-lon.service';

@Component({
  selector: 'app-map-center-display',
  templateUrl: './map-center-display.component.html',
})
export class MapCenterDisplayComponent extends L.Control {

  /* Supplies the values that we display. */
  private positionObservable: Observable<Geoposition>;
  private latLonService: LatLonService;

  constructor(
  ) {
    super();
    this.options.position = 'bottomleft';
    /* We're not able to inject this because of our constructor limitations. */
    this.latLonService = new LatLonService();
  }

  public onAdd(map: L.Map) {
    /* This name matches the element by which we reference our component. */
    let htmlElement = L.DomUtil.create('div', 'map-center-display-component');
    htmlElement.style.margin = "0px 0px 20px 65px";
    htmlElement.style.background = "rgba(255,255,255,0.7)";
    htmlElement.style.color = "#333";
    htmlElement.style.borderRadius = "5px";
    return htmlElement;
  }

  public setMapCenterObservable(
    positionObservable: Observable<Geoposition>,
  ): Subscription {
    return positionObservable.subscribe(
      (geoPosition: Geoposition) => {
        this.updateDisplayedValue(geoPosition);
      }
    );
  }

  /** Updates the coordinates we display. */
  private updateDisplayedValue(geoPosition: Geoposition) {
    if (geoPosition && geoPosition.coords) {
      this.getContainer().innerHTML = this.latLonService.toFixedLatLng(geoPosition);
    } else {
      this.getContainer().innerHTML = "";
    }
  }

}
