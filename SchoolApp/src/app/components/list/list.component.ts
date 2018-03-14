import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppConfig } from '../../utils/app-config';
import { Labels } from '../../utils/labels';
import { Router } from '@angular/router';
import { UtilFunctions } from '../../utils/util-functions';
import { DataServiceService } from '../../services/data-service.service';
import { BookService } from '../../services/book.service';
import { TeacherService } from '../../services/teacher.service';
import { ClassesService } from '../../services/classes.service';
import { StudentService } from '../../services/student.service';
import { AttendanceService } from '../../services/attendance.service';
import { HomeWorkService } from '../../services/home-work.service';
import { TimeTableService } from '../../services/time-table.service';
import { ExamService } from '../../services/exam.service';
import { ResultService } from '../../services/result.service';
import { DriverService } from '../../services/driver.service';
import { RouteService } from '../../services/route.service';
import { AlbumService } from '../../services/album.service';
import { NotificationService } from '../../services/notification.service';
import { BusService } from '../../services/bus.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  type: string;
  data = [];
  filteredData = [];
  pageSize = 10;
  locale: any;
  commonLocale: any;
  deleteCache: any;
  rows = [];
  columns = [];
  filterColumns = [];
  ref: any;

  constructor(private route: ActivatedRoute, private router: Router, private _data: DataServiceService,
    private _book: BookService, private _teacher: TeacherService, private _student: StudentService) {
    this.route.params.subscribe((params) => {
      this.type = params['type'];
      this.checkLogin();
      this.getUpdatedList(this.type);
      this.initializeTable(this.type);
    });
  }

  ngOnInit() {

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
    let val = event.target.value.toLowerCase();
    let colsAmt = this.columns.length;
    let keys = Object.keys(this.rows[0]);
    this.data = this.filteredData.filter(function (item) {
      for (let i = 0; i < colsAmt; i++) {
        if (item[keys[i]].toLowerCase().indexOf(val) !== -1 || !val) {
          return true;
        }
      }
    });
  }

  view(row: any) {
    this._data.storage = row;
    this.router.navigate([this.ref.viewRef]);
  }

  edit(row: any) {

  }

  delete(row: any, go: any) {
    if( go ) {
      console.log("DELETE"+this.deleteCache);
    } else {
      this.deleteCache = row;
      console.log("Cached"+this.deleteCache);
    }
  }

  setPageSize(size: any) {
    this.pageSize = size;
  }

  initializeTable(type) {

    this.data = this.rows;
    this.filteredData = [...this.rows];
    this.commonLocale = Labels.en_IN.labels.table.common;
    this.locale = Labels.en_IN.labels.table[type];
    this.columns = AppConfig[type];
    this.ref = AppConfig.tableNavigationConfig[type];
    this.filterColumns = this.columns;

    console.log(this.columns);
    console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>' + this.data);
  }

  checkLogin(){
    const user = UtilFunctions.getLocalStorage('userName');
    if ( user ) {
      return;
    }
    this.router.navigate(['/login']);
  }

  getUpdatedList(type) {
    if (type === 'teacher') {
      this._teacher.getTeacherList().subscribe((res) => {
        this.rows = res;
        console.log('>>' + this.rows);
    }, (resError) => {
      });
    }
    if (type === 'student') {
      this._student.getStudentList().subscribe((res) => {
        this.rows = res;
        console.log('>>' + this.rows);
    }, (resError) => {
      });
    }

  }
}
