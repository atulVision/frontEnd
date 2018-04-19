import { Component, OnInit } from '@angular/core';
import { UtilFunctions } from '../../../../utils/util-functions';
import { RouteService } from '../../../../services/route.service';
import { Router } from '@angular/router';
import { Broadcaster } from '../../../../utils/broadcaster';
import { Labels } from '../../../../utils/labels';
import { AppConfig } from '../../../../utils/app-config';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

// Author : Tushar Upadhay

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
  formLocale: any;

  constructor(private router: Router, private broadcaster: Broadcaster,
    private _route: RouteService, private spinnerService: Ng4LoadingSpinnerService) {
  }

  ngOnInit() {
    this.rows = [];
    this.checkLogin();
    this.getUpdatedList();
  }

  initializeTable() {
    this.commonLocale = Labels.en_IN.labels.table.common;
    this.locale = Labels.en_IN.labels.table.route;
    this.columns = AppConfig.route;
    this.ref = AppConfig.tableNavigationConfig.route;
    this.filterColumns = this.columns;
    this.formLocale = Labels.en_IN.labels.form_labels;
  }

  getUpdatedList() {
    this.spinnerService.show();
      this._route.getRouteList().subscribe((res) => {
        this.rows = res;
        this.filteredData = this.rows;
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
       this._route.deleteRoute(this.deleteCache.route.routeId).subscribe((res) => {
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
    const keys = ['routeName'];
    const colAmt = keys.length;
    this.rows = this.filteredData.filter(function (item) {
      for (let i = 0; i < colAmt; i++) {
        if (item.route[keys[i]].toLowerCase().indexOf(val) !== -1 || !val) {
          return true;
        }
      }
    });
  }
}
