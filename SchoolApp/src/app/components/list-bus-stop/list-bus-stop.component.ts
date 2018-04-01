import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Broadcaster } from '../../utils/broadcaster';
import { BusStopService } from '../../services/bus-stop.service';
import { Labels } from '../../utils/labels';
import { AppConfig } from '../../utils/app-config';
import { UtilFunctions } from '../../utils/util-functions';

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

  constructor(private router: Router, private broadcaster: Broadcaster, private _busStop: BusStopService) {
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
  }

  getUpdatedList() {

      this._busStop.getBusStopList().subscribe((res) => {
        this.rows = res;
        console.log(this.rows);
      }, (resError) => {
      });

    this.initializeTable();
  }

  view(row: any) {
    this.broadcaster.storage = row;
    this.router.navigate([this.ref.viewRef]);
  }

  edit(row: any) {
    console.log(row);
    this.broadcaster.storage = row;
    this.router.navigate([this.ref.editRef]);
  }

  delete(row: any, go: any) {
    if (go) {
       this._busStop.deleteBusStop(this.deleteCache.busStopId).subscribe((res) => {
        }, (resError) => {
        });
     } else {
      this.deleteCache = row;
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

  toggle(col) {
    const isChecked = this.isChecked(col);

    if (isChecked) {
      this.columns = this.columns.filter(c => {
        return c.prop !== col.prop;
      });
    } else {
      this.columns = [...this.columns, col];
    }
  }

  isChecked(col) {
    return this.columns.find(c => {
      return c.prop === col.prop;
    });
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
