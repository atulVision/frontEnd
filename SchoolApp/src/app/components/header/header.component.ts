import { Component, OnInit } from '@angular/core';
import { UtilFunctions } from '../../utils/util-functions';
import { Labels } from '../../utils/labels';
import { DataServiceService } from '../../services/data-service.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  locale: any;
  userName: any;

  constructor(private _data: DataServiceService) { }

  ngOnInit() {
    this.locale = Labels.en_IN.labels.header;
    this._data.storage_profile = JSON.parse(UtilFunctions.getLocalStorage('user'));
    this.userName = this._data.storage_profile.firstName + ' ' + this._data.storage_profile.lastName;
  }

  checkLogin() {
    const user = UtilFunctions.getLocalStorage('user');
    return user ? true : false;
  }

}
