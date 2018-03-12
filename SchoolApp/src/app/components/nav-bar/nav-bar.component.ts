import { Component, OnInit } from '@angular/core';
import { AppConfig } from '../../utils/app-config';
import { Labels } from '../../utils/labels';
import { UtilFunctions } from '../../utils/util-functions';
import * as $ from 'jquery';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  menus: any;
  locale: any;
  constructor() { }

  ngOnInit() {
    this.menus = AppConfig.sideMenuConfig.menu;
    this.locale = Labels.en_IN.labels.side_menu;
    $(document).ready(() => {
      const trees: any = $('[data-widget="tree"]');
      trees.tree();
    });
  }

  checkLogin() {
    const user = UtilFunctions.getLocalStorage('userName');
    if ( user ) {
      return true;
    }
    return false;
  }
}
