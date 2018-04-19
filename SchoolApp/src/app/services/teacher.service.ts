import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Constants } from '../utils/constants';
import { Teacher } from '../models/teacher.model';

// Author : Tushar Upadhyay

@Injectable()
export class TeacherService {

  constructor(private _http: Http) { }

  getTeacherList() {
    return this._http.get(Constants.URL.host_url + Constants.URL.teacherURL)
      .map((response: Response) => {
        return response.json();
      })
      .catch(this._errorHandler);
  }

  saveTeacher(teacher: Teacher) {
    return this._http.post(Constants.URL.host_url + Constants.URL.teacherURL, teacher)
      .map((response: Response) => {
        return response.json();
      })
      .catch(this._errorHandler);
  }

  updateTeacher(teacherId: any, teacher: Teacher) {
    return this._http.put(Constants.URL.host_url + Constants.URL.teacherURL + '/' + teacherId, teacher)
      .map((response: Response) => {
        return response.json();
      })
      .catch(this._errorHandler);
  }

  deleteTeacher(teacherId: any) {
    return this._http.delete(Constants.URL.host_url + Constants.URL.teacherURL + '/' + teacherId)
      .map((response: Response) => {
        return response.json();
      })
      .catch(this._errorHandler);
  }

  _errorHandler(error: Response) {
    return Observable.throw(error || 'server error');
  }


}
