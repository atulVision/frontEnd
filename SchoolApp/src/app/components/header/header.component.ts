import { Component, OnInit } from '@angular/core';
import { UtilFunctions } from '../../utils/util-functions';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  checkLogin() {
    const user = UtilFunctions.getLocalStorage('userName');
    if ( user ) {
      return true;
    }
    return false;
  }

}
