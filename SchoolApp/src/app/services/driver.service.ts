import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Constants } from '../utils/constants';
import { Driver } from '../models/driver.model';

@Injectable()
export class DriverService {

  constructor(private _http: Http) { }

  getDriverList() {
    return this._http.get(Constants.URL.host_url + Constants.URL.driverURL)
      .map((response: Response) => {
        return response.json();
      })
      .catch(this._errorHandler);
  }

  saveDriver(driver: Driver) {
    return this._http.post(Constants.URL.host_url + Constants.URL.driverURL, driver)
      .map((response: Response) => {
        return response.json();
      })
      .catch(this._errorHandler);
  }

  updateDriver(driverId: any, driver: Driver) {
    return this._http.put(Constants.URL.host_url + Constants.URL.driverURL + '/' + driverId, driver)
      .map((response: Response) => {
        return response.json();
      })
      .catch(this._errorHandler);
  }

  deleteDriver(driverId: any) {
    return this._http.delete(Constants.URL.host_url + Constants.URL.driverURL + '/' + driverId)
      .map((response: Response) => {
        return response.json();
      })
      .catch(this._errorHandler);
  }

  _errorHandler(error: Response) {
    return Observable.throw(error || 'server error');
  }

}
