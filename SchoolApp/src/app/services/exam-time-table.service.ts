import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Constants } from '../utils/constants';
import { ExamTimeTable } from '../models/exam-time-table.model';

// Author : Tushar Upadhyay

@Injectable()
export class ExamTimeTableService {

  constructor(private _http: Http) { }

  getExamTimeTableList(obj: any) {
    return this._http.post(Constants.URL.host_url + Constants.URL.examTimeTableListURL, obj)
      .map((response: Response) => {
        return response.json();
      })
      .catch(this._errorHandler);
  }

  saveExamTimeTable(examTimeTable: ExamTimeTable) {
    return this._http.post(Constants.URL.host_url + Constants.URL.examTimeTableURL, examTimeTable)
      .map((response: Response) => {
        return response.json();
      })
      .catch(this._errorHandler);
  }

  updateExamTimeTable(examtimeTableId: any, examTimeTable: ExamTimeTable) {
    return this._http.put(Constants.URL.host_url + Constants.URL.examTimeTableURL + '/' + examtimeTableId, examTimeTable)
      .map((response: Response) => {
        return response.json();
      })
      .catch(this._errorHandler);
  }

  deleteExamTimeTable(examtimeTableId: any) {
    return this._http.delete(Constants.URL.host_url + Constants.URL.examTimeTableURL + '/' + examtimeTableId)
      .map((response: Response) => {
        return response.json();
      })
      .catch(this._errorHandler);
  }

  _errorHandler(error: Response) {
    return Observable.throw(error || 'server error');
  }

}
