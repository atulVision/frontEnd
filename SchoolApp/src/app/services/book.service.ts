import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Constants } from '../utils/constants';
import { Book } from '../models/book.model';

@Injectable()
export class BookService {

  constructor(private _http: Http) { }

  getBookList() {
    return this._http.get(Constants.URL.host_url + Constants.URL.bookURL)
      .map((response: Response) => {
        return response.json();
      })
      .catch(this._errorHandler);
  }

  saveBook(book: Book) {
    return this._http.post(Constants.URL.host_url + Constants.URL.bookURL, book)
      .map((response: Response) => {
        return response.json();
      })
      .catch(this._errorHandler);
  }

  updateBook(bookId: any, book: Book) {
    return this._http.put(Constants.URL.host_url + Constants.URL.bookURL + '/' + bookId, book)
      .map((response: Response) => {
        return response.json();
      })
      .catch(this._errorHandler);
  }

  deleteBook(bookId: any) {
    return this._http.delete(Constants.URL.host_url + Constants.URL.bookURL + '/' + bookId)
      .map((response: Response) => {
        return response.json();
      })
      .catch(this._errorHandler);
  }

  _errorHandler(error: Response) {
    return Observable.throw(error || 'server error');
  }

}
