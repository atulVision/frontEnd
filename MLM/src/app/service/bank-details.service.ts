import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class BankDetailsService {

  constructor(private _http: Http) { }

  get() {
    return this._http.get('')
      .map((response: Response) => {
        return response.json();
      })
      .catch(this._errorHandler);
  }

  save(x: any) {
    return this._http.post('', x)
      .map((response: Response) => {
        return response.json();
      })
      .catch(this._errorHandler);
  }

  update(x: any) {
    return this._http.put('', x)
      .map((response: Response) => {
        return response.json();
      })
      .catch(this._errorHandler);
  }

  delete(x: any) {
    return this._http.delete('', x)
      .map((response: Response) => {
        return response.json();
      })
      .catch(this._errorHandler);
  }

  _errorHandler(error: Response) {
    return Observable.throw(error || 'server error');
  }
}
