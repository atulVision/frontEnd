import { Component, OnInit } from '@angular/core';
import { UtilFunctions } from '../../utils/util-functions';
import { RouteService } from '../../services/route.service';
import { Router } from '@angular/router';
import { Broadcaster } from '../../utils/broadcaster';
import { Labels } from '../../utils/labels';
import { AppConfig } from '../../utils/app-config';

@Component({
  selector: 'app-list-route',
  templateUrl: './list-route.component.html',
  styleUrls: ['./list-route.component.css']
})
export class ListRouteComponent implements OnInit {
  filteredData = [];
  pageSize = 10;
  locale: any;
  commonLocale: any;
  deleteCache: any;
  rows = [];
  columns = [];
  filterColumns = [];
  ref: any;

  constructor(private router: Router, private broadcaster: Broadcaster, private _route: RouteService) {
  }

  ngOnInit() {
    this.rows = [];
    this.checkLogin();
    this.getUpdatedList();
  }

  initializeTable() {
    this.filteredData = [this.rows];
    this.commonLocale = Labels.en_IN.labels.table.common;
    this.locale = Labels.en_IN.labels.table.route;
    this.columns = AppConfig.route;
    this.ref = AppConfig.tableNavigationConfig.route;
    this.filterColumns = this.columns;
  }

  getUpdatedList() {

      this._route.getRouteList().subscribe((res) => {
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
       this._route.deleteRoute(this.deleteCache.routeId).subscribe((res) => {
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
