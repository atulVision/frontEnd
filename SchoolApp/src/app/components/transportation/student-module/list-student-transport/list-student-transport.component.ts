import { Component, OnInit } from '@angular/core';
import { UtilFunctions } from '../../../../utils/util-functions';
import { Router } from '@angular/router';
import { Broadcaster } from '../../../../utils/broadcaster';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { StudentService } from '../../../../services/student.service';
import { Labels } from '../../../../utils/labels';
import { AppConfig } from '../../../../utils/app-config';
import { RouteService } from '../../../../services/route.service';
import { BusStopService } from '../../../../services/bus-stop.service';
import { Student } from '../../../../models/student.model';
import { Classes } from '../../../../models/classes.model';
import { Division } from '../../../../models/division.model';
import { Route } from '../../../../models/route.model';
import { BusStop } from '../../../../models/bus-stop.model';

// Author : Tushar Upadhay

@Component({
  selector: 'app-list-student-transport',
  templateUrl: './list-student-transport.component.html',
  styleUrls: ['./list-student-transport.component.css']
})
export class ListStudentTransportComponent implements OnInit {
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
  editFlag = false;
  routeList: any;
  busStopList: any;
  editing = {};
  studentToUpdate: Student;

  constructor(private router: Router, private broadcaster: Broadcaster,
    private _student: StudentService, private _route: RouteService,
    private _busStop: BusStopService, private spinnerService: Ng4LoadingSpinnerService) {
  }

  ngOnInit() {
    this.rows = [];
    this.studentToUpdate = new Student(null, '', '', '', '', '', '', '', '', '', '', '', '', '',
      new Classes(null, '', '', null, null), new Division(null, '', ''), '', '', '', '', new Route(null, '', null, null),
      new BusStop(null, '', '', ''), '', '');
    this.checkLogin();
    this.spinnerService.show();
    this.getUpdatedList();
    this.getList();
    this.spinnerService.hide();
  }

  private getList() {
    this._route.getRouteList().subscribe((res) => {
      this.routeList = res;
    }, (resError) => {
    });
    this._busStop.getBusStopList().subscribe((res) => {
      this.busStopList = res;
    }, (resError) => {
    });
  }

  initializeTable() {
    this.commonLocale = Labels.en_IN.labels.table.common;
    this.locale = Labels.en_IN.labels.table.studentT;
    this.columns = AppConfig.studentT;
    this.ref = AppConfig.tableNavigationConfig.student;
    this.filterColumns = this.columns;
    this.formLocale = Labels.en_IN.labels.form_labels;
  }

  getUpdatedList() {
    this.spinnerService.show();
    this._student.getStudentList().subscribe((res) => {
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

  updateValue(event, cell, rowIndex, row) {
    this.editing[rowIndex + '-' + cell] = false;
    this.studentToUpdate = row;
    if (cell === 'route') {
      this.studentToUpdate.route.routeId = event.target.value;
    }
    if (cell === 'busStop') {
      this.studentToUpdate.busStop.busStopId = event.target.value;
    }
    this.spinnerService.show();
    this._student.updateStudent(this.studentToUpdate.studentId, this.studentToUpdate).subscribe((res) => {
      this.spinnerService.hide();
    }, (resError) => {
    });
    this.ngOnInit();
    this.getUpdatedList();
  }

  delete(row: any, go: any) {
    this.spinnerService.show();
    if (go) {
      this._student.deleteStudent(this.deleteCache.studentId).subscribe((res) => {
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
    const keys = ['rollNo', 'firstName', 'lastName'];
    const colAmt = keys.length;
    this.rows = this.filteredData.filter(function (item) {
      for (let i = 0; i < colAmt; i++) {
        if (item[keys[i]].toString().toLowerCase().indexOf(val) !== -1 || !val) {
          return true;
        }
      }
    });
  }
}
