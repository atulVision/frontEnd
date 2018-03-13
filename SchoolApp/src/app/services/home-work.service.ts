import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Constants } from '../utils/constants';
import { HomeWork } from '../models/home-work.model';

@Injectable()
export class HomeWorkService {

  constructor(private _http: Http) { }

  getHomeWorkList() {
    return this._http.get(Constants.URL.host_url + Constants.URL.homeWorkURL)
      .map((response: Response) => {
        const userResponse = response.json();
        return userResponse;
      })
      .catch(this._errorHandler);
  }

  saveHomeWork(homeWork: HomeWork) {
    return this._http.post(Constants.URL.host_url + Constants.URL.homeWorkURL, homeWork)
      .map((response: Response) => {
        const userResponse = response.json();
        return userResponse;
      })
      .catch(this._errorHandler);
  }

  updateHomeWork(homeWorkId: any, homeWork: HomeWork) {
    return this._http.put(Constants.URL.host_url + Constants.URL.homeWorkURL + '/' + homeWorkId, homeWork)
      .map((response: Response) => {
        const userResponse = response.json();
        return userResponse;
      })
      .catch(this._errorHandler);
  }

  deleteHomeWork(homeWorkId: any) {
    return this._http.delete(Constants.URL.host_url + Constants.URL.homeWorkURL + '/' + homeWorkId)
      .map((response: Response) => {
        const userResponse = response.json();
        return userResponse;
      })
      .catch(this._errorHandler);
  }

  _errorHandler(error: Response) {
    return Observable.throw(error || 'server error');
  }

}
