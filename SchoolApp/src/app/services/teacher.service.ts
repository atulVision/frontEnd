import { Injectable } from '@angular/core';
import { Http , Response, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Constants } from '../utils/constants';
import { Teacher } from '../models/teacher.model';

@Injectable()
export class TeacherService {

  constructor(private _http: Http) { }

  getTeacherList() {
    return this._http.get(Constants.URL.host_url + Constants.URL.getTeacherListURL)
    .map((response: Response) => {
        const userResponse = response.json();
        return userResponse;
    })
    .catch(this._errorHandler);
}

saveBook(book) {
    return this._http.post(Constants.URL.host_url + Constants.URL.bookURL, book)
    .map((response: Response) => {
        const userResponse = response.json();
        return userResponse;
    })
    .catch(this._errorHandler);
}

updateBook(book) {
  return this._http.put(Constants.URL.host_url + Constants.URL.bookURL, book)
  .map((response: Response) => {
      const userResponse = response.json();
      return userResponse;
  })
  .catch(this._errorHandler);
}

deleteBook(bookId) {
  return this._http.delete(Constants.URL.host_url + Constants.URL.bookURL + bookId)
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
