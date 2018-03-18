import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppConfig } from '../../utils/app-config';
import { Labels } from '../../utils/labels';
import { Router } from '@angular/router';
import { UtilFunctions } from '../../utils/util-functions';
import { DataServiceService } from '../../services/data-service.service';
import { Driver } from '../../models/driver.model';
import { DriverService } from '../../services/driver.service';

@Component({
  selector: 'app-school-driver',
  templateUrl: './school-driver.component.html',
  styleUrls: ['./school-driver.component.css']
})
export class SchoolDriverComponent implements OnInit {

  action: string;
  viewFlag = false;
  driver: Driver;
  pageTitle: any;
  locale: any;
  formLocale: any;

  constructor(private route: ActivatedRoute, private router: Router, private _data: DataServiceService, private _driver: DriverService) {
    this.route.params.subscribe((params) => {
      this.action = params['action'];
      this.initializeDriver();
      if (this.action === 'new') {
        this.viewFlag = false;
      }
      if (this.action === 'edit') {
        this.viewFlag = false;
        this.driver = this._data.storage;
      }
      if (this.action === 'view') {
        this.viewFlag = true;
        this.driver = this._data.storage;
      }
      this.locale = Labels.en_IN.labels.page_title;
      this.formLocale = Labels.en_IN.labels.form_labels;
      this.pageTitle = this.locale[this.action] + ' ' + this.locale.driver;
    });
  }

  ngOnInit() {
   this.checkLogin();
  }

  initializeDriver() {
    this.driver = new Driver(0, '', '', '', '', '', '', '', '', '', '');
  }

  addDriver(data) {
    console.log(data);
    this._driver.saveDriver(data).subscribe((res) => {
      console.log(res);
  }, (resError) => {
  });
  }

  backToList() {
    this.router.navigate(['/list/driver']);
  }

  checkLogin() {
    const user = UtilFunctions.getLocalStorage('user');
    if ( user ) {
      return;
    }
    this.router.navigate(['/login']);
  }
}
