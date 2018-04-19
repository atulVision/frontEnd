import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppConfig } from '../../../../utils/app-config';
import { Labels } from '../../../../utils/labels';
import { Router } from '@angular/router';
import { UtilFunctions } from '../../../../utils/util-functions';
import { Driver } from '../../../../models/driver.model';
import { DriverService } from '../../../../services/driver.service';
import { Broadcaster } from '../../../../utils/broadcaster';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

// Author : Tushar Upadhay

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

  constructor(private route: ActivatedRoute, private router: Router, private broadcaster: Broadcaster,
    private _driver: DriverService, private spinnerService: Ng4LoadingSpinnerService) {
    this.route.params.subscribe((params) => {
      this.action = params['action'];
      this.initializeDriver();
      if (this.action === 'new') {
        this.viewFlag = false;
      }
      if (this.action === 'edit') {
        this.viewFlag = false;
        this.driver = this.broadcaster.storage;
      }
      if (this.action === 'view') {
        this.viewFlag = true;
        this.driver = this.broadcaster.storage;
      }
      this.locale = Labels.en_IN.labels.page_title;
      this.formLocale = Labels.en_IN.labels.form_labels;
      this.pageTitle = this.locale[this.action] + ' ' + this.locale.driver;
    });
  }

  ngOnInit() {
    this.checkLogin();
  }

  private initializeDriver() {
    this.driver = new Driver(null, '', '', '', '', '', '', '', '');
  }

  public addDriver(data) {
    this.spinnerService.show();
    if (this.action === 'new') {
      this._driver.saveDriver(this.driver).subscribe((res) => {
        this.spinnerService.hide();
      }, (resError) => {
      });
    }
    if (this.action === 'edit') {
      this._driver.updateDriver(this.driver.driverId, this.driver).subscribe((res) => {
        this.spinnerService.hide();
      }, (resError) => {
      });
    }
  }

  public backToList() {
    this.router.navigate(['/list/driver']);
  }

  private checkLogin() {
    const user = UtilFunctions.getLocalStorage('user');
    if (user) {
      return;
    }
    this.router.navigate(['/login']);
  }
}
