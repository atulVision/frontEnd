import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Login } from '../model/login.model';
import { Constants } from '../utils/constants';

@Injectable()
export class LoginService {

  constructor(private _http: Http) { }



  login(obj: Login) {
    return this._http.post(Constants.basUrl + Constants.urls.loginURL, obj)
      .map((response: Response) => {
        return response.json();
      })
      .catch(this._errorHandler);
  }

  _errorHandler(error: Response) {
    return Observable.throw(error || 'server error');
  }

}
