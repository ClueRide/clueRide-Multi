import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {BASE_URL, AuthHeaderService} from '../../auth/header/auth-header.service';
import {Edge} from './edge';
import {Observable} from 'rxjs';

/** Provides access to an Edge's GeoJSON. */
@Injectable({
  providedIn: 'root'
})
export class EdgeService {

  constructor(
    private http: HttpClient,
    private httpService: AuthHeaderService,
  ) {
    console.log('Hello EdgeProvider Provider');
  }

  public getEdgeGeoJson(edgeId: number): Observable<Edge> {
    return this.http.get<Edge>(
      BASE_URL + 'edge/geojson/' + edgeId,
      {headers: this.httpService.getAuthHeaders()}
    );
  }

}
