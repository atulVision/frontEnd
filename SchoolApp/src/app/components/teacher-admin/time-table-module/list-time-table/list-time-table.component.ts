import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Broadcaster } from '../../../../utils/broadcaster';
import { TimeTableService } from '../../../../services/time-table.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Labels } from '../../../../utils/labels';
import { AppConfig } from '../../../../utils/app-config';
import { UtilFunctions } from '../../../../utils/util-functions';
import { ClassesService } from '../../../../services/classes.service';
import { DivisionService } from '../../../../services/division.service';
import { SubjectService } from '../../../../services/subject.service';
import { DayService } from '../../../../services/day.service';

// Author : Tushar Upadhyay

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
  classList: any;
  divisionList: any;
  subjectList: any;
  dayList: any;
  obj: Obj;

  constructor(
    private router: Router,
    private broadcaster: Broadcaster,
    private _timeT: TimeTableService,
    private _class: ClassesService,
    private _division: DivisionService,
    private _subject: SubjectService,
    private _day: DayService,
    private spinnerService: Ng4LoadingSpinnerService
  ) {}

  ngOnInit() {
    this.rows = [];
    this.checkLogin();
    this.spinnerService.show();
    this.getList();
    this.spinnerService.hide();
    this.obj = new Obj(null, null, null, null);
    this.getUpdatedList(this.obj);
  }

  private getList() {
    this._class.getClassList().subscribe(
      res => {
        this.classList = res;
      },
      resError => {}
    );
    this._division.getDivisionList().subscribe(
      res => {
        this.divisionList = res;
      },
      resError => {}
    );
    this._subject.getSubjectList().subscribe(
      res => {
        this.subjectList = res;
      },
      resError => {}
    );
    this._day.getDaysList().subscribe(
      res => {
        this.dayList = res;
      },
      resError => {}
    );
  }

  initializeTable() {
    this.commonLocale = Labels.en_IN.labels.table.common;
    this.locale = Labels.en_IN.labels.table.timeT;
    this.columns = AppConfig.timeT;
    this.ref = AppConfig.tableNavigationConfig.timeT;
    this.filterColumns = this.columns;
    this.formLocale = Labels.en_IN.labels.form_labels;
  }

  getUpdatedList(data) {
    this.spinnerService.show();
    this._timeT.getTimeTableList(this.obj).subscribe(
      res => {
        this.rows = res;
        this.filteredData = this.rows;
        this.spinnerService.hide();
      },
      resError => {}
    );
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
      this._timeT
        .deleteTimeTable(this.deleteCache.id)
        .subscribe(res => {}, resError => {});
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
    const keys = ['title'];
    const colAmt = keys.length;
    this.rows = this.filteredData.filter(function(item) {
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
  public dayId: number;

  constructor(
    subjectId: number,
    classId: number,
    divisionId: number,
    dayId: number
  ) {
    this.subjectId = subjectId;
    this.classId = classId;
    this.divisionId = divisionId;
    this.dayId = dayId;
  }
}
