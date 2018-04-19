import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Constants } from '../utils/constants';
import { Student } from '../models/student.model';

// Author : Tushar Upadhyay

@Injectable()
export class StudentService {

  constructor(private _http: Http) { }

  getStudentList() {
    return this._http.get(Constants.URL.host_url + Constants.URL.studentURL)
      .map((response: Response) => {
        return response.json();
      })
      .catch(this._errorHandler);
  }

  getClassDivStudentList(obj: any) {
    return this._http.post(Constants.URL.host_url + Constants.URL.studentListURL, obj)
      .map((response: Response) => {
        return response.json();
      })
      .catch(this._errorHandler);
  }

  saveStudent(student: Student) {
    return this._http.post(Constants.URL.host_url + Constants.URL.studentURL, student)
      .map((response: Response) => {
        return response.json();
      })
      .catch(this._errorHandler);
  }

  updateStudent(studentId: any, student: Student) {
    return this._http.put(Constants.URL.host_url + Constants.URL.studentURL + '/' + studentId, student)
      .map((response: Response) => {
        return response.json();
      })
      .catch(this._errorHandler);
  }

  deleteStudent(studentId: any) {
    return this._http.delete(Constants.URL.host_url + Constants.URL.studentURL + '/' + studentId)
      .map((response: Response) => {
        return response.json();
      })
      .catch(this._errorHandler);
  }

  _errorHandler(error: Response) {
    return Observable.throw(error || 'server error');
  }

}
