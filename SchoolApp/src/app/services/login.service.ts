import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Constants } from '../utils/constants';
import { User } from '../models/user.model';

// Author : Tushar Upadhyay

@Injectable()
export class LoginService {

  constructor(private _http: Http) { }

  login(role: any, user: User) {
    return this._http.post(Constants.URL.host_url + Constants.URL.loginURL + '/' + role, user)
      .map((response: Response) => {
        return response.json();
      })
      .catch(this._errorHandler);
  }

  _errorHandler(error: Response) {
    return Observable.throw(error || 'server error');
  }

}
