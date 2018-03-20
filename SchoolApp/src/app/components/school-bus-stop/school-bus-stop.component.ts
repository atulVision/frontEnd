import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppConfig } from '../../utils/app-config';
import { Labels } from '../../utils/labels';
import { Router } from '@angular/router';
import { UtilFunctions } from '../../utils/util-functions';
import { DataServiceService } from '../../services/data-service.service';
import { Bus } from '../../models/bus.model';
import { BusService } from '../../services/bus.service';

@Component({
  selector: 'app-school-bus-stop',
  templateUrl: './school-bus-stop.component.html',
  styleUrls: ['./school-bus-stop.component.css']
})
export class SchoolBusStopComponent implements OnInit {

  action: string;
  viewFlag = false;
  bus: Bus;
  pageTitle: any;
  locale: any;
  formLocale: any;

  constructor(private route: ActivatedRoute, private router: Router, private _data: DataServiceService, private _bus: BusService) {
    this.route.params.subscribe((params) => {
      this.action = params['action'];
      this.initializeBus();
      if (this.action === 'new') {
        this.viewFlag = false;
      }
      if (this.action === 'edit') {
        this.viewFlag = false;
        this.bus = this._data.storage;
      }
      if (this.action === 'view') {
        this.viewFlag = true;
        this.bus = this._data.storage;
      }
      this.locale = Labels.en_IN.labels.page_title;
      this.formLocale = Labels.en_IN.labels.form_labels;
      this.pageTitle = this.locale[this.action] + " " + this.locale.bus;
    });
  }

  ngOnInit() {
    this.checkLogin();
  }

  initializeBus() {
    this.bus = new Bus(0, '', '', '', '', '', '', '');
  }

  addBus(data) {
    console.log(data);
    this._bus.saveBus(data).subscribe((res) => {
      console.log(res);
  }, (resError) => {
  });
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
