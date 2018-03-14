import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Constants } from '../utils/constants';
import { TimeTable } from '../models/time-table.model';

@Injectable()
export class TimeTableService {

  constructor(private _http: Http) { }

  getTimeTableList() {
    return this._http.get(Constants.URL.host_url + Constants.URL.timeTableURL)
      .map((response: Response) => {
        return response.json();
      })
      .catch(this._errorHandler);
  }

  saveTimeTable(timeTable: TimeTable) {
    return this._http.post(Constants.URL.host_url + Constants.URL.timeTableURL, timeTable)
      .map((response: Response) => {
        return response.json();
      })
      .catch(this._errorHandler);
  }

  updateTimeTable(timeTableId: any, timeTable: TimeTable) {
    return this._http.put(Constants.URL.host_url + Constants.URL.timeTableURL + '/' + timeTableId, timeTable)
      .map((response: Response) => {
        return response.json();
      })
      .catch(this._errorHandler);
  }

  deleteTimeTable(timeTableId: any) {
    return this._http.delete(Constants.URL.host_url + Constants.URL.timeTableURL + '/' + timeTableId)
      .map((response: Response) => {
        return response.json();
      })
      .catch(this._errorHandler);
  }

  _errorHandler(error: Response) {
    return Observable.throw(error || 'server error');
  }

}
