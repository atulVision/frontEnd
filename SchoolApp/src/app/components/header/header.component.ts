import { Component, OnInit } from '@angular/core';
import { UtilFunctions } from '../../utils/util-functions';
import { Labels } from '../../utils/labels';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  locale: any;

  constructor() { }

  ngOnInit() {
    this.locale = Labels.en_IN.labels.header;
  }

  checkLogin() {
    const user = UtilFunctions.getLocalStorage('userName');
    if ( user ) {
      return true;
    }
    return false;
  }

}
