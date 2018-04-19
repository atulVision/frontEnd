import { Component, OnInit } from '@angular/core';
import { AppConfig } from '../../../utils/app-config';
import { Labels } from '../../../utils/labels';
import { UtilFunctions } from '../../../utils/util-functions';
import * as $ from 'jquery';

// Author : Tushar Upadhay

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  menus: any;
  locale: any;
  role: any;

  constructor() { }

  ngOnInit() {
    this.menus = AppConfig.sideMenuConfig.menu;
    this.locale = Labels.en_IN.labels.side_menu;
    $(document).ready(() => {
      const trees: any = $('[data-widget="tree"]');
    });
  }

  checkLogin() {
    const user = UtilFunctions.getLocalStorage('user');
    return user ? true : false;
  }

  checkRole(role) {
    this.role = UtilFunctions.getLocalStorage('role');
    if (role.length > 1) {
      const rolesArr = role.split(',');
      return rolesArr.indexOf(this.role) !== -1 ? true : false;
    }
    return this.role === role ? true : false;
  }

}
