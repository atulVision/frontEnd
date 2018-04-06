import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Constants } from '../utils/constants';
import { Day } from '../models/day.model';

@Injectable()
export class DayService {

  constructor(private _http: Http) { }

  getDaysList() {
    return this._http.get(Constants.URL.host_url + Constants.URL.dayURL)
      .map((response: Response) => {
        return response.json();
      })
      .catch(this._errorHandler);
  }

  saveDay(day: Day) {
    return this._http.post(Constants.URL.host_url + Constants.URL.dayURL, day)
      .map((response: Response) => {
        return response.json();
      })
      .catch(this._errorHandler);
  }

  updateDay(dayId: any, day: Day) {
    return this._http.put(Constants.URL.host_url + Constants.URL.dayURL + '/' + dayId, day)
      .map((response: Response) => {
        return response.json();
      })
      .catch(this._errorHandler);
  }

  deleteDay(dayId: any) {
    return this._http.delete(Constants.URL.host_url + Constants.URL.dayURL + '/' + dayId)
      .map((response: Response) => {
        return response.json();
      })
      .catch(this._errorHandler);
  }

  _errorHandler(error: Response) {
    return Observable.throw(error || 'server error');
  }

}
