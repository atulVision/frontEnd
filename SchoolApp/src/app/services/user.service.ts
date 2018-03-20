import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Constants } from '../utils/constants';
import { User } from '../models/user.model';

@Injectable()
export class UserService {

  constructor(private _http: Http) { }

  updateProfile(userId: any, user: User) {
    return this._http.put(Constants.URL.host_url + Constants.URL.userURL + '/' + userId, user)
      .map((response: Response) => {
        return response.json();
      })
      .catch(this._errorHandler);
  }

  _errorHandler(error: Response) {
    return Observable.throw(error || 'server error');
  }

}
