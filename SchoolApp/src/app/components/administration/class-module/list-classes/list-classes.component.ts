import { Component, OnInit } from '@angular/core';
import { UtilFunctions } from '../../../../utils/util-functions';
import { Labels } from '../../../../utils/labels';
import { AppConfig } from '../../../../utils/app-config';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Broadcaster } from '../../../../utils/broadcaster';
import { Router } from '@angular/router';
import { ClassesService } from '../../../../services/classes.service';

// Author : Tushar Upadhyay

@Component({
  selector: 'app-list-classes',
  templateUrl: './list-classes.component.html',
  styleUrls: ['./list-classes.component.css']
})
export class ListClassesComponent implements OnInit {

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

  constructor(private router: Router,
    private broadcaster: Broadcaster,
    private _class: ClassesService,
    private spinnerService: Ng4LoadingSpinnerService) {
  }

  ngOnInit() {
    this.rows = [];
    this.checkLogin();
    this.getUpdatedList();
  }

  private initializeTable() {
    this.commonLocale = Labels.en_IN.labels.table.common;
    this.locale = Labels.en_IN.labels.table.class;
    this.columns = AppConfig.class;
    this.ref = AppConfig.tableNavigationConfig.class;
    this.filterColumns = this.columns;
    this.formLocale = Labels.en_IN.labels.form_labels;
  }

  public getUpdatedList() {
    this.spinnerService.show();
    this._class.getClassList().subscribe((res) => {
      this.rows = res;
      this.filteredData = this.rows;
      this.spinnerService.hide();
    }, (resError) => {
    });
    this.initializeTable();
  }

  public view(row: any) {
    this.broadcaster.storage = row;
    this.router.navigate([this.ref.viewRef]);
  }

  public edit(row: any) {
    this.broadcaster.storage = row;
    this.router.navigate([this.ref.editRef]);
  }

  public delete(row: any, go: any) {
    this.spinnerService.show();
    if (go) {
      this._class.deleteClass(this.deleteCache.id).subscribe((res) => {
      }, (resError) => {
      });
      this.ngOnInit();
      this.spinnerService.hide();
    } else {
      this.deleteCache = row;
      this.spinnerService.hide();
    }
  }

  public setPageSize(size: any) {
    this.pageSize = size;
  }

  private checkLogin() {
    const user = UtilFunctions.getLocalStorage('user');
    if (user) {
      return;
    }
    this.router.navigate(['/login']);
  }

  public updateFilter(event) {
    const val = event.target.value.toLowerCase();
    const keys = ['className'];
    const colAmt = keys.length;
    this.rows = this.filteredData.filter(function (item) {
      for (let i = 0; i < colAmt; i++) {
        if (item[keys[i]].toLowerCase().indexOf(val) !== -1 || !val) {
          return true;
        }
      }
    });
  }
}
