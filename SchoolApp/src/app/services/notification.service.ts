import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Constants } from '../utils/constants';

@Injectable()
export class NotificationService {

  constructor(private _http: Http) { }

  getNotificationList() {
    return this._http.get(Constants.URL.host_url + Constants.URL.notificationURL)
      .map((response: Response) => {
        return response.json();
      })
      .catch(this._errorHandler);
  }

  saveNotification(notification: Notification) {
    return this._http.post(Constants.URL.host_url + Constants.URL.notificationURL, notification)
      .map((response: Response) => {
        return response.json();
      })
      .catch(this._errorHandler);
  }

  updateNotification(notificationId: any, notification: Notification) {
    return this._http.put(Constants.URL.host_url + Constants.URL.notificationURL + '/' + notificationId, notification)
      .map((response: Response) => {
        return response.json();
      })
      .catch(this._errorHandler);
  }

  deleteNotification(notificationId: any) {
    return this._http.delete(Constants.URL.host_url + Constants.URL.notificationURL + '/' + notificationId)
      .map((response: Response) => {
        return response.json();
      })
      .catch(this._errorHandler);
  }

  _errorHandler(error: Response) {
    return Observable.throw(error || 'server error');
  }

}
