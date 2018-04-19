import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Constants } from '../utils/constants';
import { Result } from '../models/result.model';

// Author : Tushar Upadhyay

@Injectable()
export class ResultService {

  constructor(private _http: Http) { }

  getResultList(obj: any) {
    return this._http.post(Constants.URL.host_url + Constants.URL.resultListURL, obj)
      .map((response: Response) => {
        return response.json();
      })
      .catch(this._errorHandler);
  }

  saveResult(result: Result) {
    return this._http.post(Constants.URL.host_url + Constants.URL.resultURL, result)
      .map((response: Response) => {
        return response.json();
      })
      .catch(this._errorHandler);
  }

  updateResult(resultId: any, result: Result) {
    return this._http.put(Constants.URL.host_url + Constants.URL.resultURL + '/' + resultId, result)
      .map((response: Response) => {
        return response.json();
      })
      .catch(this._errorHandler);
  }

  deleteResult(resultId: any) {
    return this._http.delete(Constants.URL.host_url + Constants.URL.resultURL + '/' + resultId)
      .map((response: Response) => {
        return response.json();
      })
      .catch(this._errorHandler);
  }

  _errorHandler(error: Response) {
    return Observable.throw(error || 'server error');
  }

}
