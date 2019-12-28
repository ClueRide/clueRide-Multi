import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {
  AuthHeaderService,
  BASE_URL
} from '../../auth/header/auth-header.service';
import {Attraction} from '../attraction/attraction';
import {Image} from './image';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private readonly authHeaders: HttpHeaders;

  constructor(
    private http: HttpClient,
    private authHeaderService: AuthHeaderService,
  ) {
    this.authHeaders = this.authHeaderService.getAuthHeaders();
  }

  /**
   * Create a New Image record.
   * @param formData contains the data about which Location this is being attached to.
   */
  uploadImage(formData: FormData): Observable<any>  {
    const uploadHeaders: HttpHeaders = this.authHeaderService.getAuthHeaders();
    uploadHeaders.append('Content-Type', undefined);
    return this.http.post<any>(
      BASE_URL + 'image/upload',
      formData,
      {headers: uploadHeaders}
    );
  }

  /**
   * Returns the server's idea of whether the given location has
   * more than one image.
   * @param locationId Unique ID for the Location.
   */
  hasMultipleImages(locationId: number): Observable<boolean> {
    return this.http.get<boolean>(
      BASE_URL + 'image/multi-image/' + locationId,
      {headers: this.authHeaders}
    );
  }

  /**
   * Returns a list of Images for the given Location.
   * @param locationId unique identifier for the Location.
   */
  getAllImagesForLocation(locationId: number): Observable<Image[]> {
    return this.http.get<Image[]>(
      BASE_URL + 'image/' + locationId,
      {headers: this.authHeaders}
    );
  }

  /**
   * Sets the Featured Image for the given Attraction to the given Image.
   *
   * @param attractionId unique identifier for the Attraction.
   * @param imageId unique identifier for an image which has already been created in the database.
   */
  setFeaturedImage(
    attractionId: number,
    imageId: number
  ): Observable<Attraction> {
    return this.http.put<Attraction>(
      BASE_URL + 'location/featured/' + attractionId + '/' + imageId,
      {},
      {headers: this.authHeaders}
    );
  }

}
