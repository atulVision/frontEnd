import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { UserRegistration } from '../model/user-registration.model';
import { Constants } from '../utils/constants';

@Injectable()
export class UserRegistrationService {


  constructor(private _http: Http) { }

  getAllUser() {
    return this._http.get(Constants.basUrl + Constants.urls.getAllUserURL)
      .map((response: Response) => {
        return response.json();
      })
      .catch(this._errorHandler);
  }

  saveUser(obj: UserRegistration) {
    return this._http.post(Constants.basUrl + Constants.urls.regURL, obj)
      .map((response: Response) => {
        return response.json();
      })
      .catch(this._errorHandler);
  }

  updateUser(obj: UserRegistration) {
    return this._http.post(Constants.basUrl + Constants.urls.editProfile, obj)
      .map((response: Response) => {
        return response.json();
      })
      .catch(this._errorHandler);
  }

  delete(x: any) {
    return this._http.delete('', x)
      .map((response: Response) => {
        return response.json();
      })
      .catch(this._errorHandler);
  }

  _errorHandler(error: Response) {
    return Observable.throw(error || 'server error');
  }
}
