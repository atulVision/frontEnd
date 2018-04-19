import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Constants } from '../utils/constants';
import { Bus } from '../models/bus.model';

// Author : Tushar Upadhyay

@Injectable()
export class BusService {

  constructor(private _http: Http) { }

  getBusList() {
    return this._http.get(Constants.URL.host_url + Constants.URL.busURL)
      .map((response: Response) => {
        return response.json();
      })
      .catch(this._errorHandler);
  }

  saveBus(bus: Bus) {
    return this._http.post(Constants.URL.host_url + Constants.URL.busURL, bus)
      .map((response: Response) => {
        return response.json();
      })
      .catch(this._errorHandler);
  }

  updateBus(busId: any, bus: Bus) {
    return this._http.put(Constants.URL.host_url + Constants.URL.busURL + '/' + busId, bus)
      .map((response: Response) => {
        return response.json();
      })
      .catch(this._errorHandler);
  }

  deleteBus(busId: any) {
    return this._http.delete(Constants.URL.host_url + Constants.URL.busURL + '/' + busId)
      .map((response: Response) => {
        return response.json();
      })
      .catch(this._errorHandler);
  }

  _errorHandler(error: Response) {
    return Observable.throw(error || 'server error');
  }

}
