import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Broadcaster } from '../../../../utils/broadcaster';
import { NotificationService } from '../../../../services/notification.service';
import { ClassesService } from '../../../../services/classes.service';
import { DivisionService } from '../../../../services/division.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Labels } from '../../../../utils/labels';
import { AppConfig } from '../../../../utils/app-config';
import { UtilFunctions } from '../../../../utils/util-functions';

@Component({
  selector: 'app-list-notification',
  templateUrl: './list-notification.component.html',
  styleUrls: ['./list-notification.component.css']
})
export class ListNotificationComponent implements OnInit {

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
  classList: any;
  divisionList: any;
  obj: Obj;

  constructor(private router: Router,
    private broadcaster: Broadcaster,
    private _notification: NotificationService,
    private _class: ClassesService,
    private _division: DivisionService,
    private spinnerService: Ng4LoadingSpinnerService) {
  }

  ngOnInit() {
    this.rows = [];
    this.checkLogin();
    this.spinnerService.show();
    this.getList();
    this.spinnerService.hide();
    this.obj = new Obj(null, null);
    this.getUpdatedList(this.obj, false);
  }

  private getList() {
    this._class.getClassList().subscribe((res) => {
      this.classList = res;
    }, (resError) => {
    });
    this._division.getDivisionList().subscribe((res) => {
      this.divisionList = res;
    }, (resError) => {
    });
  }

  private initializeTable() {
    this.commonLocale = Labels.en_IN.labels.table.common;
    this.locale = Labels.en_IN.labels.table.notification;
    this.columns = AppConfig.notification;
    this.ref = AppConfig.tableNavigationConfig.notification;
    this.filterColumns = this.columns;
    this.formLocale = Labels.en_IN.labels.form_labels;
  }

  public getUpdatedList(data, action) {
    this.spinnerService.show();
    this._notification.getNotificationList(this.obj).subscribe((res) => {
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
      this._notification.deleteNotification(this.deleteCache.id).subscribe((res) => {
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
    const keys = ['title', 'tag'];
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

class Obj {
  public classId: number;
  public divisionId: number;

  constructor(classId: number, divisionId: number) {
    this.classId = classId;
    this.divisionId = divisionId;
  }
}
