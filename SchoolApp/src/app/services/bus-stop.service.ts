import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Constants } from '../utils/constants';
import { BusStop } from '../models/bus-stop.model';

// Author : Tushar Upadhyay

@Injectable()
export class BusStopService {

  constructor(private _http: Http) { }

  getBusStopList() {
    return this._http.get(Constants.URL.host_url + Constants.URL.busStopURL)
      .map((response: Response) => {
        return response.json();
      })
      .catch(this._errorHandler);
  }

  saveBusStop(busStop: BusStop) {
    return this._http.post(Constants.URL.host_url + Constants.URL.busStopURL, busStop)
      .map((response: Response) => {
        return response.json();
      })
      .catch(this._errorHandler);
  }

  updateBusStop(stopId: any, busStop: BusStop) {
    return this._http.put(Constants.URL.host_url + Constants.URL.busStopURL + '/' + stopId, busStop)
      .map((response: Response) => {
        return response.json();
      })
      .catch(this._errorHandler);
  }

  deleteBusStop(stopId: any) {
    return this._http.delete(Constants.URL.host_url + Constants.URL.busStopURL + '/' + stopId)
      .map((response: Response) => {
        return response.json();
      })
      .catch(this._errorHandler);
  }

  _errorHandler(error: Response) {
    return Observable.throw(error || 'server error');
  }

}
