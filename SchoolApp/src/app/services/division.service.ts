import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Constants } from '../utils/constants';
import { Division } from '../models/division.model';

// Author : Tushar Upadhyay

@Injectable()
export class DivisionService {

  constructor(private _http: Http) { }

  getDivisionList() {
    return this._http.get(Constants.URL.host_url + Constants.URL.divisionURL)
      .map((response: Response) => {
        return response.json();
      })
      .catch(this._errorHandler);
  }

  saveDivision(division: Division) {
    return this._http.post(Constants.URL.host_url + Constants.URL.divisionURL, division)
      .map((response: Response) => {
        return response.json();
      })
      .catch(this._errorHandler);
  }

  updateDivision(divisionId: any, division: Division) {
    return this._http.put(Constants.URL.host_url + Constants.URL.divisionURL + '/' + divisionId, division)
      .map((response: Response) => {
        return response.json();
      })
      .catch(this._errorHandler);
  }

  deleteDivision(divisionId: any) {
    return this._http.delete(Constants.URL.host_url + Constants.URL.divisionURL + '/' + divisionId)
      .map((response: Response) => {
        return response.json();
      })
      .catch(this._errorHandler);
  }

  _errorHandler(error: Response) {
    return Observable.throw(error || 'server error');
  }

}
