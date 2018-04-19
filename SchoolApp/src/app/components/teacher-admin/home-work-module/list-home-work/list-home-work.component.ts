import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Broadcaster } from '../../../../utils/broadcaster';
import { HomeWorkService } from '../../../../services/home-work.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Labels } from '../../../../utils/labels';
import { AppConfig } from '../../../../utils/app-config';
import { UtilFunctions } from '../../../../utils/util-functions';
import { DivisionService } from '../../../../services/division.service';
import { ClassesService } from '../../../../services/classes.service';
import { SubjectService } from '../../../../services/subject.service';

// Author : Tushar Upadhyay

@Component({
  selector: 'app-list-home-work',
  templateUrl: './list-home-work.component.html',
  styleUrls: ['./list-home-work.component.css']
})
export class ListHomeWorkComponent implements OnInit {
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
  subjectList: any;
  obj: Obj;

  constructor(private router: Router, private broadcaster: Broadcaster,
    private _homeW: HomeWorkService, private _class: ClassesService,
    private _division: DivisionService, private _subject: SubjectService,
    private spinnerService: Ng4LoadingSpinnerService) {
  }

  ngOnInit() {
    this.rows = [];
    this.checkLogin();
    this.spinnerService.show();
    this.getList();
    this.spinnerService.hide();
    this.obj = new Obj(null, null, null);
    this.getUpdatedList(this.obj);
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
    this._subject.getSubjectList().subscribe((res) => {
      this.subjectList = res;
    }, (resError) => {
    });
  }

  initializeTable() {
    this.commonLocale = Labels.en_IN.labels.table.common;
    this.locale = Labels.en_IN.labels.table.homeW;
    this.columns = AppConfig.homeW;
    this.ref = AppConfig.tableNavigationConfig.homeW;
    this.filterColumns = this.columns;
    this.formLocale = Labels.en_IN.labels.form_labels;
  }

  getUpdatedList(data) {
    this.spinnerService.show();
    this._homeW.getHomeWorkList(this.obj).subscribe((res) => {
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
      this._homeW.deleteHomeWork(this.deleteCache.homeWorkId).subscribe((res) => {
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
    const keys = ['homeWorkDate'];
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
  public subjectId: number;
  public classId: number;
  public divisionId: number;

  constructor(subjectId: number, classId: number, divisionId: number) {
    this.subjectId = subjectId;
    this.classId = classId;
    this.divisionId = divisionId;
  }
}
