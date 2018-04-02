import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppConfig } from '../../../../utils/app-config';
import { Labels } from '../../../../utils/labels';
import { Router } from '@angular/router';
import { UtilFunctions } from '../../../../utils/util-functions';
import { Bus } from '../../../../models/bus.model';
import { BusService } from '../../../../services/bus.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Broadcaster } from '../../../../utils/broadcaster';
import { DriverService } from '../../../../services/driver.service';
import { RouteService } from '../../../../services/route.service';
import { Driver } from '../../../../models/driver.model';
import { Route } from '../../../../models/route.model';
import { BusStop } from '../../../../models/bus-stop.model';

@Component({
  selector: 'app-school-bus',
  templateUrl: './school-bus.component.html',
  styleUrls: ['./school-bus.component.css']
})
export class SchoolBusComponent implements OnInit {

  action: string;
  viewFlag = false;
  bus: Bus;
  pageTitle: any;
  locale: any;
  formLocale: any;
  driverObj: Driver;
  routeObj: Route;
  driverList: any;
  routeList: any;

  constructor(private route: ActivatedRoute, private router: Router, private broadcaster: Broadcaster,
    private _bus: BusService, private spinnerService: Ng4LoadingSpinnerService, private _driver: DriverService,
    private _route: RouteService) {
    this.route.params.subscribe((params) => {
      this.action = params['action'];
      this.initializeBus();
      if (this.action === 'new') {
        this.viewFlag = false;
      }
      if (this.action === 'edit') {
        this.viewFlag = false;
        this.bus = this.broadcaster.storage;
      }
      if (this.action === 'view') {
        this.viewFlag = true;
        this.bus = this.broadcaster.storage;
      }
      this.locale = Labels.en_IN.labels.page_title;
      this.formLocale = Labels.en_IN.labels.form_labels;
      this.pageTitle = this.locale[this.action] + ' ' + this.locale.bus;
    });
  }

  ngOnInit() {
    this.checkLogin();

    this._driver.getDriverList().subscribe((res) => {
      this.driverList = res;
    }, (resError) => {
    });

    this._route.getRouteList().subscribe((res) => {
      this.routeList = res;
    }, (resError) => {
    });

  }

  private initializeBus() {
    this.driverObj = new Driver(null, '', '', '', '', '', '', '', '');
    this.routeObj = new Route(null, '', new BusStop(null, '', '', ''), new BusStop(null, '', '', ''))
    this.bus = new Bus(null, '', '', this.driverObj, this.routeObj);
  }

  public addBus(data) {
    this.spinnerService.show();
    if (this.action === 'new') {
      this._bus.saveBus(this.bus).subscribe((res) => {
        this.spinnerService.hide();
      }, (resError) => {
      });
    }
    if (this.action === 'edit') {
      this._bus.updateBus(this.bus.busId, this.bus).subscribe((res) => {
        this.spinnerService.hide();
      }, (resError) => {
      });
    }
  }

  public backToList() {
    this.router.navigate(['/list/bus']);
  }

  private checkLogin() {
    const user = UtilFunctions.getLocalStorage('user');
    if (user) {
      return;
    }
    this.router.navigate(['/login']);
  }
}
