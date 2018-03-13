import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Constants } from '../utils/constants';
import { Attendance } from '../models/attendance.model';

@Injectable()
export class AttendanceService {

  constructor(private _http: Http) { }

  getAttendanceList() {
    return this._http.get(Constants.URL.host_url + Constants.URL.AttendanceURL)
      .map((response: Response) => {
        const userResponse = response.json();
        return userResponse;
      })
      .catch(this._errorHandler);
  }

  saveAttendance(attendance: Attendance) {
    return this._http.post(Constants.URL.host_url + Constants.URL.attendanceURL, attendance)
      .map((response: Response) => {
        const userResponse = response.json();
        return userResponse;
      })
      .catch(this._errorHandler);
  }

  updateAttendance(attendanceId: any, attendance: Attendance) {
    return this._http.put(Constants.URL.host_url + Constants.URL.bookURL + '/' + attendanceId, attendance)
      .map((response: Response) => {
        const userResponse = response.json();
        return userResponse;
      })
      .catch(this._errorHandler);
  }

  deleteAttendance(AttendanceId: any) {
    return this._http.delete(Constants.URL.host_url + Constants.URL.bookURL + '/' + AttendanceId)
      .map((response: Response) => {
        const userResponse = response.json();
        return userResponse;
      })
      .catch(this._errorHandler);
  }

  _errorHandler(error: Response) {
    return Observable.throw(error || 'server error');
  }


}
