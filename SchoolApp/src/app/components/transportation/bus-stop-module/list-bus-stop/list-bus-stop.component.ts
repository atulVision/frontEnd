import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Broadcaster } from '../../../../utils/broadcaster';
import { BusStopService } from '../../../../services/bus-stop.service';
import { Labels } from '../../../../utils/labels';
import { AppConfig } from '../../../../utils/app-config';
import { UtilFunctions } from '../../../../utils/util-functions';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-list-bus-stop',
  templateUrl: './list-bus-stop.component.html',
  styleUrls: ['./list-bus-stop.component.css']
})
export class ListBusStopComponent implements OnInit {
  filteredData = [];
  pageSize = 10;
  locale: any;
  commonLocale: any;
  deleteCache: any;
  rows = [];
  columns = [];
  filterColumns = [];
  ref: any;
  formLocale: any;

  constructor(private router: Router, private broadcaster: Broadcaster,
    private _busStop: BusStopService, private spinnerService: Ng4LoadingSpinnerService) {
  }

  ngOnInit() {
    this.rows = [];
    this.checkLogin();
    this.getUpdatedList();
  }

  initializeTable() {
    this.filteredData = [this.rows];
    this.commonLocale = Labels.en_IN.labels.table.common;
    this.locale = Labels.en_IN.labels.table.busS;
    this.columns = AppConfig.busS;
    this.ref = AppConfig.tableNavigationConfig.busS;
    this.filterColumns = this.columns;
    this.formLocale = Labels.en_IN.labels.form_labels;
  }

  getUpdatedList() {
    this.spinnerService.show();
    this._busStop.getBusStopList().subscribe((res) => {
      this.rows = res;
      this.spinnerService.hide();
    }, (resError) => {
    });

    this.initializeTable();
  }

  view(row: any) {
    this.broadcaster.storage = row;
    this.router.navigate([this.ref.viewRef]);
  }

  edit(row: any) {
    this.broadcaster.storage = row;
    this.router.navigate([this.ref.editRef]);
  }

  delete(row: any, go: any) {
    this.spinnerService.show();
    if (go) {
      this._busStop.deleteBusStop(this.deleteCache.busStopId).subscribe((res) => {
      }, (resError) => {
      });
      this.ngOnInit();
      this.spinnerService.hide();
    } else {
      this.deleteCache = row;
      this.spinnerService.hide();
    }
  }

  setPageSize(size: any) {
    this.pageSize = size;
  }

  checkLogin() {
    const user = UtilFunctions.getLocalStorage('user');
    if (user) {
      return;
    }
    this.router.navigate(['/login']);
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    const colsAmt = this.rows[0].length;
    const keys = Object.keys(this.rows[0]);
    this.rows = this.filteredData.filter(function (item) {
      for (let i = 0; i < colsAmt; i++) {
        if (item[keys[i]].toLowerCase().indexOf(val) !== -1 || !val) {
          return true;
        }
      }
    });
  }
}
