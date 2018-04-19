import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Constants } from '../utils/constants';
import { Gallery } from '../models/gallery.model';

// Author : Tushar Upadhyay

@Injectable()
export class GalleryService {

  constructor(private _http: Http) { }

  getGalleryList() {
    return this._http.get(Constants.URL.host_url + Constants.URL.galleryURL + '/')
      .map((response: Response) => {
        return response.json();
      })
      .catch(this._errorHandler);
  }

  saveGallery(gallery: Gallery) {
    return this._http.post(Constants.URL.host_url + Constants.URL.galleryURL, gallery)
      .map((response: Response) => {
        return response.json();
      })
      .catch(this._errorHandler);
  }

  updateGallery(galleryId: any, gallery: Gallery) {
    return this._http.put(Constants.URL.host_url + Constants.URL.galleryURL + '/' + galleryId, gallery)
      .map((response: Response) => {
        return response.json();
      })
      .catch(this._errorHandler);
  }

  deleteGallery(galleryId: any) {
    return this._http.delete(Constants.URL.host_url + Constants.URL.galleryURL + '/' + galleryId)
      .map((response: Response) => {
        return response.json();
      })
      .catch(this._errorHandler);
  }

  _errorHandler(error: Response) {
    return Observable.throw(error || 'server error');
  }

}
