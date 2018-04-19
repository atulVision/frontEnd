import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Constants } from '../utils/constants';
import { BusRoute } from '../models/route.model';

// Author : Tushar Upadhyay

@Injectable()
export class RouteService {

  constructor(private _http: Http) { }

  getRouteList() {
    return this._http.get(Constants.URL.host_url + Constants.URL.routeURL)
      .map((response: Response) => {
        const userResponse = response.json();
        return userResponse;
      })
      .catch(this._errorHandler);
  }

  saveRoute(route: BusRoute) {
    return this._http.post(Constants.URL.host_url + Constants.URL.routeURL, route)
      .map((response: Response) => {
        const userResponse = response.json();
        return userResponse;
      })
      .catch(this._errorHandler);
  }

  updateRoute(routeId: any, route: BusRoute) {
    return this._http.put(Constants.URL.host_url + Constants.URL.routeURL + '/' + routeId, route)
      .map((response: Response) => {
        const userResponse = response.json();
        return userResponse;
      })
      .catch(this._errorHandler);
  }

  deleteRoute(routeId: any) {
    return this._http.delete(Constants.URL.host_url + Constants.URL.routeURL + '/' + routeId)
      .map((response: Response) => {
        const userResponse = response.json();
        return userResponse;
      })
      .catch(this._errorHandler);
  }

  deleteBusStop(routeId: any, stopId: any) {
    return this._http.delete(Constants.URL.host_url + Constants.URL.routeURL + '/' + routeId + '/bustop/' + stopId)
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
