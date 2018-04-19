import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Constants } from '../utils/constants';
import { Exam } from '../models/exam.model';

// Author : Tushar Upadhyay

@Injectable()
export class ExamService {

  constructor(private _http: Http) { }

  getExamList() {
    return this._http.get(Constants.URL.host_url + Constants.URL.examURL)
      .map((response: Response) => {
        return response.json();
      })
      .catch(this._errorHandler);
  }

  saveExam(exam: Exam) {
    return this._http.post(Constants.URL.host_url + Constants.URL.examURL, exam)
      .map((response: Response) => {
        return response.json();
      })
      .catch(this._errorHandler);
  }

  updateExam(examId: any, exam: Exam) {
    return this._http.put(Constants.URL.host_url + Constants.URL.examURL + '/' + examId, exam)
      .map((response: Response) => {
        return response.json();
      })
      .catch(this._errorHandler);
  }

  deleteExam(examId: any) {
    return this._http.delete(Constants.URL.host_url + Constants.URL.examURL + '/' + examId)
      .map((response: Response) => {
        return response.json();
      })
      .catch(this._errorHandler);
  }

  _errorHandler(error: Response) {
    return Observable.throw(error || 'server error');
  }

}
