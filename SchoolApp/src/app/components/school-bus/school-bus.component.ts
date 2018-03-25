import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppConfig } from '../../utils/app-config';
import { Labels } from '../../utils/labels';
import { Router } from '@angular/router';
import { UtilFunctions } from '../../utils/util-functions';
import { Bus } from '../../models/bus.model';
import { BusService } from '../../services/bus.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Broadcaster } from '../../utils/broadcaster';


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

  driverList = [{driverId : 1, name: 'Vishal'}, {driverId : 2, name: 'Ram'}, {driverId : 3, name: 'Vijay'}];
  routeList = [{routeId : 1, name: 'Hadapsar'}, {routeId : 2, name: 'Hinjewadi'}, {routeId : 3, name: 'Wakad'}];

  constructor(private route: ActivatedRoute, private router: Router, private broadcaster: Broadcaster,
    private _bus: BusService, private spinnerService: Ng4LoadingSpinnerService) {
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
  }

  initializeBus() {
    this.bus = new Bus(0, '', '', 0, 0);
  }

  addBus(data) {
  this.spinnerService.show();
    if (this.action === 'new') {
      this._bus.saveBus(this.bus).subscribe((res) => {
        console.log(res);
        this.spinnerService.hide();
    }, (resError) => {
    });
    }
    if (this.action === 'edit') {
      this._bus.updateBus(this.bus.busId, this.bus).subscribe((res) => {
        console.log(res);
        this.spinnerService.hide();
    }, (resError) => {
    });
    }
  }

  backToList() {
    this.router.navigate(['/list/bus']);
  }

  checkLogin() {
    const user = UtilFunctions.getLocalStorage('user');
    if ( user ) {
      return;
    }
    this.router.navigate(['/login']);
  }
}
