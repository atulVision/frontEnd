import { Injectable } from '@angular/core';
import { Http, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
@Injectable()
export class MyDataTransferService {

  constructor(private http: Http) { }

  fetchData(user) {

    const json = JSON.stringify(user);
    console.log(json);
    const params: URLSearchParams = new URLSearchParams();
    params.set('user' , json.toString() );
    const requestOptions = new RequestOptions();
    requestOptions.search = params;

    this.http.get('http://192.168.2.10:8093/visionServer/getdataserv', requestOptions)
      .toPromise()
      .then(response => response.json());
  }
}
