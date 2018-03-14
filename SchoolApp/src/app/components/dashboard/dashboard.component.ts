import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilFunctions } from '../../utils/util-functions';
import { Labels } from '../../utils/labels';
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
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  locale: any;

  constructor(private router: Router, private _classes: ClassesService, private _teacher: TeacherService,
    private _student: StudentService, private _attendance: AttendanceService, private _timeT: TimeTableService,
    private _homeW: HomeWorkService, private _exam: ExamService, private _result: ResultService,
    private _driver: DriverService, private _bus: BusService, private _route: RouteService,
    private _book: BookService, private _album: AlbumService, private _notification: NotificationService,
    private _data: DataServiceService) { }

  ngOnInit() {
    this.getAllData();
    this.locale = Labels.en_IN.labels.dashboard;
    const user = UtilFunctions.getLocalStorage('userName');
    if (user) {
      return;
    }
    this.router.navigate(['/login']);
  }

  getAllData() {

    this._classes.getClassList().subscribe((res) => {
      console.log(res);
      this._data.storage_class = res;
    }, (resError) => {
    });

    this._teacher.getTeacherList().subscribe((res) => {
      console.log(res);
      this._data.storage_teacher = res;
    }, (resError) => {
    });

    this._student.getStudentList().subscribe((res) => {
      console.log(res);
      this._data.storage_student = res;
    }, (resError) => {

    });

    this._attendance.getAttendanceList().subscribe((res) => {
      console.log(res);
      this._data.storage_attendance = res;
    }, (resError) => {
    });

    this._homeW.getHomeWorkList().subscribe((res) => {
      console.log(res);
      this._data.storage_homeW = res;
    }, (resError) => {
    });

    this._timeT.getTimeTableList().subscribe((res) => {
      console.log(res);
      this._data.storage_timeT = res;
    }, (resError) => {
    });

    this._exam.getExamList().subscribe((res) => {
      console.log(res);
      this._data.storage_exam = res;
    }, (resError) => {
    });

    this._result.getResultList().subscribe((res) => {
      console.log(res);
      this._data.storage_result = res;
    }, (resError) => {
    });

    this._driver.getDriverList().subscribe((res) => {
      console.log(res);
      this._data.storage_driver = res;
    }, (resError) => {
    });

    this._bus.getBusList().subscribe((res) => {
      console.log(res);
      this._data.storage_bus = res;
    }, (resError) => {
    });

    this._route.getRouteList().subscribe((res) => {
      console.log(res);
      this._data.storage_route = res;
    }, (resError) => {
    });

    this._book.getBookList().subscribe((res) => {
      console.log(res);
      this._data.storage_book = res;
    }, (resError) => {
    });

    this._album.getAlbumList().subscribe((res) => {
      console.log(res);
      this._data.storage_album = res;
    }, (resError) => {
    });

    this._notification.getNotificationList().subscribe((res) => {
      console.log(res);
      this._data.storage_notification = res;
    }, (resError) => {
    });

  }

}
