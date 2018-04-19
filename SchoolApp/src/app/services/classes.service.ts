import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Constants } from '../utils/constants';
import { Classes } from '../models/classes.model';

// Author : Tushar Upadhyay

@Injectable()
export class ClassesService {

  constructor(private _http: Http) { }

  getClassList() {
    return this._http.get(Constants.URL.host_url + Constants.URL.classURL)
      .map((response: Response) => {
        return response.json();
      })
      .catch(this._errorHandler);
  }

  saveClass(classes: Classes) {
    return this._http.post(Constants.URL.host_url + Constants.URL.classURL, classes)
      .map((response: Response) => {
        return response.json();
      })
      .catch(this._errorHandler);
  }

  updateClass(classId: any, classes: Classes) {
    return this._http.put(Constants.URL.host_url + Constants.URL.classURL + '/' + classId, classes)
      .map((response: Response) => {
        return response.json();
      })
      .catch(this._errorHandler);
  }

  deleteClass(classId: any) {
    return this._http.delete(Constants.URL.host_url + Constants.URL.classURL + '/' + classId)
      .map((response: Response) => {
        return response.json();
      })
      .catch(this._errorHandler);
  }

  _errorHandler(error: Response) {
    return Observable.throw(error || 'server error');
  }

}
