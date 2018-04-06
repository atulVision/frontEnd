import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Constants } from '../utils/constants';
import { Subject } from '../models/subject.model';

@Injectable()
export class SubjectService {

  constructor(private _http: Http) { }

  getSubjectList() {
    return this._http.get(Constants.URL.host_url + Constants.URL.subjectURL)
      .map((response: Response) => {
        return response.json();
      })
      .catch(this._errorHandler);
  }

  saveSubject(sub: Subject) {
    return this._http.post(Constants.URL.host_url + Constants.URL.subjectURL, sub)
      .map((response: Response) => {
        return response.json();
      })
      .catch(this._errorHandler);
  }

  updateSubject(subId: any, sub: Subject) {
    return this._http.put(Constants.URL.host_url + Constants.URL.subjectURL + '/' + subId, sub)
      .map((response: Response) => {
        return response.json();
      })
      .catch(this._errorHandler);
  }

  deleteSubject(subId: any) {
    return this._http.delete(Constants.URL.host_url + Constants.URL.subjectURL + '/' + subId)
      .map((response: Response) => {
        return response.json();
      })
      .catch(this._errorHandler);
  }

  _errorHandler(error: Response) {
    return Observable.throw(error || 'server error');
  }

}
