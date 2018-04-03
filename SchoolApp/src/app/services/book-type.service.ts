import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Constants } from '../utils/constants';
import { BookType } from '../models/book-type.model';


@Injectable()
export class BookTypeService {
  constructor(private _http: Http) { }

  getBookTypeList() {
    return this._http.get(Constants.URL.host_url + Constants.URL.bookTypeURL)
      .map((response: Response) => {
        return response.json();
      })
      .catch(this._errorHandler);
  }

  saveBookType(bookType: BookType) {
    return this._http.post(Constants.URL.host_url + Constants.URL.bookTypeURL, bookType)
      .map((response: Response) => {
        return response.json();
      })
      .catch(this._errorHandler);
  }

  updateBookType(bookTypeId: any, bookType: BookType) {
    return this._http.put(Constants.URL.host_url + Constants.URL.bookTypeURL + '/' + bookTypeId, bookType)
      .map((response: Response) => {
        return response.json();
      })
      .catch(this._errorHandler);
  }

  deleteBookType(bookTypeId: any) {
    return this._http.delete(Constants.URL.host_url + Constants.URL.bookTypeURL + '/' + bookTypeId)
      .map((response: Response) => {
        return response.json();
      })
      .catch(this._errorHandler);
  }

  _errorHandler(error: Response) {
    return Observable.throw(error || 'server error');
  }
}
