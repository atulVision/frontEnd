import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilFunctions } from '../../../utils/util-functions';
import { Labels } from '../../../utils/labels';
import { BookService } from '../../../services/book.service';
import { TeacherService } from '../../../services/teacher.service';
import { ClassesService } from '../../../services/classes.service';
import { StudentService } from '../../../services/student.service';
import { AttendanceService } from '../../../services/attendance.service';
import { HomeWorkService } from '../../../services/home-work.service';
import { TimeTableService } from '../../../services/time-table.service';
import { ExamService } from '../../../services/exam.service';
import { ResultService } from '../../../services/result.service';
import { DriverService } from '../../../services/driver.service';
import { RouteService } from '../../../services/route.service';
import { AlbumService } from '../../../services/album.service';
import { NotificationService } from '../../../services/notification.service';
import { BusService } from '../../../services/bus.service';
import { Broadcaster } from '../../../utils/broadcaster';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { DivisionService } from '../../../services/division.service';
import { BusStopService } from '../../../services/bus-stop.service';

// Author : Tushar Upadhyay

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  locale: any;
  classLen: any;
  divisionLen: any;
  teacherLen: any;
  studentLen: any;
  libraryLen: any;
  galleryLen: any;
  notificationLen: any;
  driverLen: any;
  busLen: any;
  busStopLen: any;
  routeLen: any;
  role: any;

  constructor(private router: Router,
    private _class: ClassesService,
    private _division: DivisionService,
    private _teacher: TeacherService,
    private _busStop: BusStopService,
    private _student: StudentService,
    private _attendance: AttendanceService,
    private _timeT: TimeTableService,
    private _homeW: HomeWorkService,
    private _exam: ExamService,
    private _result: ResultService,
    private _driver: DriverService,
    private _bus: BusService,
    private _route: RouteService,
    private _book: BookService,
    private _album: AlbumService,
    private _notification: NotificationService,
    private broadcaster: Broadcaster,
    private spinnerService: Ng4LoadingSpinnerService) { }

  ngOnInit() {
    this.checkLogin();
    this.role = UtilFunctions.getLocalStorage('role');
    this.locale = Labels.en_IN.labels.dashboard;
    this.getAllData();
  }

  private getAllData() {
    this.spinnerService.show();

    if (this.role === '1') {
      this._class.getClassList().subscribe((res) => {
        this.classLen = res.length;
      }, (resError) => {
      });

      this._division.getDivisionList().subscribe((res) => {
        this.divisionLen = res.length;
      }, (resError) => {
      });

      this._teacher.getTeacherList().subscribe((res) => {
        this.teacherLen = res.length;
      }, (resError) => {
      });

      this._book.getBookList().subscribe((res) => {
        this.libraryLen = res.length;
        this.spinnerService.hide();
      }, (resError) => {
      });
    }

    if (this.role === '3') {
      this._bus.getBusList().subscribe((res) => {
        this.busLen = res.length;
        this.spinnerService.hide();
      }, (resError) => {
      });

      this._busStop.getBusStopList().subscribe((res) => {
        this.busStopLen = res.length;
      }, (resError) => {
      });

      this._driver.getDriverList().subscribe((res) => {
        this.driverLen = res.length;
      }, (resError) => {
      });

      this._route.getRouteList().subscribe((res) => {
        this.routeLen = res.length;
      }, (resError) => {
      });

      this._album.getAlbumList().subscribe((res) => {
        this.galleryLen = res.length;
      }, (resError) => {
      });
    }


    this._student.getStudentList().subscribe((res) => {
      this.studentLen = res.length;
      this.spinnerService.hide();
    }, (resError) => {
    });

  }

  private checkLogin() {
    const user = UtilFunctions.getLocalStorage('user');
    if (user) {
      return;
    }
    this.router.navigate(['/login']);
  }

}
