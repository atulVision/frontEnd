import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Broadcaster } from '../../../../utils/broadcaster';
import { TimeTableService } from '../../../../services/time-table.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Labels } from '../../../../utils/labels';
import { AppConfig } from '../../../../utils/app-config';
import { UtilFunctions } from '../../../../utils/util-functions';

@Component({
  selector: 'app-list-time-table',
  templateUrl: './list-time-table.component.html',
  styleUrls: ['./list-time-table.component.css']
})
export class ListTimeTableComponent implements OnInit {
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
    private _timeT: TimeTableService, private spinnerService: Ng4LoadingSpinnerService) {
  }

  ngOnInit() {
    this.rows = [];
    this.checkLogin();
    this.getUpdatedList();
  }

  initializeTable() {
    this.filteredData = [this.rows];
    this.commonLocale = Labels.en_IN.labels.table.common;
    this.locale = Labels.en_IN.labels.table.timeT;
    this.columns = AppConfig.timeT;
    this.ref = AppConfig.tableNavigationConfig.timeT;
    this.filterColumns = this.columns;
    this.formLocale = Labels.en_IN.labels.form_labels;
  }

  getUpdatedList() {
    this.spinnerService.show();
    this._timeT.getTimeTableList().subscribe((res) => {
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
      this._timeT.deleteTimeTable(this.deleteCache.id).subscribe((res) => {
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
