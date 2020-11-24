import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {
  AuthHeaderService,
  BASE_URL
} from '../../auth/header/auth-header.service';
import {Edge} from './edge';
import {Observable} from 'rxjs';
import {PathMeta} from '../attraction/path/path-meta';

/**
 * Provides access to an Edge's GeoJSON and supports posting of new Edges from GPX files.
 */
@Injectable({
  providedIn: 'root'
})
export class EdgeService {

  private newGpxEdgeFile: File;
  private linkPath: PathMeta;

  constructor(
    private http: HttpClient,
    private httpService: AuthHeaderService,
  ) {
    console.log('Hello EdgeService Provider');
    this.newGpxEdgeFile = null;
  }

  public getEdgeGeoJson(edgeId: number): Observable<Edge> {
    return this.http.get<Edge>(
      BASE_URL + 'edge/geojson/' + edgeId,
      {headers: this.httpService.getAuthHeaders()}
    );
  }

  /**
   * Send the file to the back-end.
   */
  public postGpxEdgeFile(): Observable<any> {
    /* Validate we've got everything we need. */
    // TODO

    console.log('Uploading', this.newGpxEdgeFile.name);

    const endpoint = BASE_URL + "edge/" + this.linkPath.id;
    const formData: FormData = new FormData();
    formData.append('fileData', this.newGpxEdgeFile, this.newGpxEdgeFile.name);
    return this.http
      .post(endpoint, formData, { headers: this.httpService.getAuthHeaders() });
  }

  /* Functions for handling the file name to be uploaded. */

  setFileToUpload(file: File): void {
    this.newGpxEdgeFile = file;
  }

  hasFileToUpload(): boolean {
    return !!this.newGpxEdgeFile;
  }

  getFileToUpload(): File {
    return this.newGpxEdgeFile;
  }

  /* Functions for handling the Link Path whose edge we're updating. */
  public setLinkPath(linkPath: PathMeta) {
    console.log("Setting LinkPath", linkPath);
    this.linkPath = linkPath;
  }

}
