import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Broadcaster } from '../../../../utils/broadcaster';
import { AttendanceService } from '../../../../services/attendance.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Labels } from '../../../../utils/labels';
import { AppConfig } from '../../../../utils/app-config';
import { UtilFunctions } from '../../../../utils/util-functions';
import { ClassesService } from '../../../../services/classes.service';
import { StudentService } from '../../../../services/student.service';
import { DivisionService } from '../../../../services/division.service';

// Author : Tushar Upadhyay

@Component({
  selector: 'app-list-attendance',
  templateUrl: './list-attendance.component.html',
  styleUrls: ['./list-attendance.component.css']
})
export class ListAttendanceComponent implements OnInit {
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
  studentList: any;
  obj: Obj;
  
  constructor(private router: Router, private broadcaster: Broadcaster,
    private _attendance: AttendanceService, private _class: ClassesService,
    private _division: DivisionService, private _student: StudentService,
    private spinnerService: Ng4LoadingSpinnerService) {
  }

  ngOnInit() {
    this.rows = [];
    this.checkLogin();
    this.spinnerService.show();
    this.getList();
    this.spinnerService.hide();
    this.obj = new Obj(null, null, null, new Date(), new Date());
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
    this._student.getStudentList().subscribe((res) => {
      this.studentList = res;
    }, (resError) => {
    });
  }

  initializeTable() {
    this.commonLocale = Labels.en_IN.labels.table.common;
    this.locale = Labels.en_IN.labels.table.attendance;
    this.columns = AppConfig.attendance;
    this.ref = AppConfig.tableNavigationConfig.attendance;
    this.filterColumns = this.columns;
    this.formLocale = Labels.en_IN.labels.form_labels;
  }

  getUpdatedList(data, action) {
    this.spinnerService.show();
    if (action) {
      const temp = this.obj.startDate.year + '-' + this.obj.startDate.month + '-' + this.obj.startDate.day;
      const temp2 = this.obj.endDate.year + '-' + this.obj.endDate.month + '-' + this.obj.endDate.day;
      this.obj.startDate = temp;
      this.obj.endDate = temp2;
    }
    this._attendance.getAttendanceList(this.obj).subscribe((res) => {
      this.rows = res;
      this.filteredData = this.rows;
      this.spinnerService.hide();
    }, (resError) => {
    });
    this.initializeTable();
    if (action) {
      const temp = this.obj.startDate.split('-');
      const temp2 = this.obj.endDate.split('-');
      this.obj.startDate = {
        day: Number(temp[2]),
        month: Number(temp[1]),
        year: Number(temp[0])
      };
      this.obj.endDate = {
        day: Number(temp2[2]),
        month: Number(temp2[1]),
        year: Number(temp2[0])
      };
    }
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
      this._attendance.deleteAttendance(this.deleteCache.attendanceId).subscribe((res) => {
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
    const keys = ['attendanceDate'];
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
  public studentId: number;
  public classId: number;
  public divisionId: number;
  public startDate: any;
  public endDate: any;

  constructor(studentId: number, classId: number, divisionId: number, startDate: any, endDate: any) {
    this.studentId = studentId;
    this.classId = classId;
    this.divisionId = divisionId;
    this.startDate = startDate;
    this.endDate = endDate;
  }
}
