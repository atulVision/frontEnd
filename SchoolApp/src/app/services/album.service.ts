import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Constants } from '../utils/constants';
import { Album } from '../models/album.model';

// Author : Tushar Upadhyay

@Injectable()
export class AlbumService {

  constructor(private _http: Http) { }

  getAlbumList() {
    return this._http.get(Constants.URL.host_url + Constants.URL.albumURL + '/')
      .map((response: Response) => {
        return response.json();
      })
      .catch(this._errorHandler);
  }

  saveAlbum(album: Album) {
    return this._http.post(Constants.URL.host_url + Constants.URL.albumURL, album)
      .map((response: Response) => {
        return response.json();
      })
      .catch(this._errorHandler);
  }

  updateAlbum(albumId: any, album: Album) {
    return this._http.put(Constants.URL.host_url + Constants.URL.albumURL + '/' + albumId, album)
      .map((response: Response) => {
        return response.json();
      })
      .catch(this._errorHandler);
  }

  deleteAlbum(albumId: any) {
    return this._http.delete(Constants.URL.host_url + Constants.URL.albumURL + '/' + albumId)
      .map((response: Response) => {
        return response.json();
      })
      .catch(this._errorHandler);
  }

  _errorHandler(error: Response) {
    return Observable.throw(error || 'server error');
  }

}
