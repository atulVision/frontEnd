import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppConfig } from '../../../../utils/app-config';
import { Labels } from '../../../../utils/labels';
import { Router } from '@angular/router';
import { UtilFunctions } from '../../../../utils/util-functions';
import { Notification } from '../../../../models/notification.model';
import { Classes } from '../../../../models/classes.model';
import { Division } from '../../../../models/division.model';
import { Student } from '../../../../models/student.model';
import { NotificationService } from '../../../../services/notification.service';
import { ClassesService } from '../../../../services/classes.service';
import { DivisionService } from '../../../../services/division.service';
import { StudentService } from '../../../../services/student.service';
import { Broadcaster } from '../../../../utils/broadcaster';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Route } from '../../../../models/route.model';
import { BusStop } from '../../../../models/bus-stop.model';
import { isDefined } from '@angular/compiler/src/util';

@Component({
  selector: 'app-school-notification',
  templateUrl: './school-notification.component.html',
  styleUrls: ['./school-notification.component.css']
})
export class SchoolNotificationComponent implements OnInit {

  action: string;
  viewFlag = false;
  notification: Notification;
  pageTitle: any;
  locale: any;
  formLocale: any;
  role: any;
  classObj: Classes;
  divisionObj: Division;
  studentObj: Student;
  studentList: Array<Student>;
  classList: any;
  divisionList: any;
  studentListObj: any;
  obj: Obj;
  show = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _notification: NotificationService,
    private _class: ClassesService,
    private _division: DivisionService,
    private _student: StudentService,
    private broadcaster: Broadcaster,
    private spinnerService: Ng4LoadingSpinnerService
  ) {
    this.route.params.subscribe(params => {
      this.action = params['action'];
      this.role = UtilFunctions.getLocalStorage('role');
      this.initializeNotification();
      if (this.action === 'new') {
        this.viewFlag = false;
      }
      if (this.action === 'edit') {
        this.viewFlag = false;
        this.notification = this.broadcaster.storage;
        this.processDate('show');
        this.processTime('show');
      }
      if (this.action === 'view') {
        this.viewFlag = true;
        this.notification = this.broadcaster.storage;
        this.processDate('show');
        this.processTime('show');
      }
      this.locale = Labels.en_IN.labels.page_title;
      this.formLocale = Labels.en_IN.labels.form_labels;
      this.pageTitle = this.locale[this.action] + ' ' + this.locale.notification;
    });
  }

  ngOnInit() {
    this.checkLogin();
    this.spinnerService.show();
    this.getList();
  }

  private getList() {
    this._class.getClassList().subscribe(
      res => {
        this.classList = res;
      },
      resError => { }
    );
    this._division.getDivisionList().subscribe(
      res => {
        this.spinnerService.hide();
        this.divisionList = res;
      },
      resError => { }
    );
  }

  private initializeNotification() {
    this.obj = new Obj(null, null);
    this.classObj = new Classes(null, '', '', null, null);
    this.divisionObj = new Division(null, '', '');
    this.studentObj = new Student(null, '', '', '', '', '', '', '', '', '', '', '', '', '',
      this.classObj, this.divisionObj, '', '', '', '', new Route(null, '', null, null), new BusStop(null, '', '', ''), '', '');
    this.studentList = [];
    this.notification = new Notification(null, '', '', '', this.classObj, this.divisionObj, '', '', this.studentList, false);
  }

  private processDate(action) {
    if (action === 'show') {
      const temp = this.notification.notificationDate.split('-');
      this.notification.notificationDate = {
        day: Number(temp[2]),
        month: Number(temp[1]),
        year: Number(temp[0])
      };
    }

    if (action === 'save') {
      const temp =
        this.notification.notificationDate.year + '-' + this.notification.notificationDate.month + '-' + this.notification.notificationDate.day;
      this.notification.notificationDate = temp;
    }
  }

  private processTime(action) {
    if (action === 'show') {
      const temp = this.notification.notificationTime.split(':');
      this.notification.notificationTime = {
        hour: Number(temp[0]),
        minute: Number(temp[1]),
        second: Number(temp[2])
      };
    }

    if (action === 'save') {
      const temp = this.notification.notificationTime.hour + ':' + this.notification.notificationTime.minute + ':' + this.notification.notificationTime.second;
      this.notification.notificationTime = temp;
    }
  }

  public getStudents() {
    this.obj.classId = this.notification.classes.id;
    this.obj.divisionId = this.notification.division.id;
    this._student.getClassDivStudentList(this.obj).subscribe(
      res => {
        this.studentListObj = res;
      },
      resError => { }
    );
    this.show = true;
  }

  public onSelection(event, obj) {
    if (obj != null) {
      if (event.target.checked) {
        this.studentObj.studentId = obj.studentId;
        this.studentList.push(this.studentObj);
        this.studentObj = new Student(null, '', '', '', '', '', '', '', '', '', '', '', '', '',
          this.classObj, this.divisionObj, '', '', '', '', new Route(null, '', null, null), new BusStop(null, '', '', ''), '', '');
      } else {
        for (let i = this.studentList.length - 1; i >= 0; --i) {
          if (this.studentList[i].studentId === obj.studentId) {
            this.studentList.splice(i, 1);
          }
        }
      }
    }
  }

  public selectAll() {
    this.studentListObj = [];
  }

  public addNotification(data) {
    this.processDate('save');
    this.processTime('save');
    this.spinnerService.show();
    if (this.action === 'new') {
      this._notification.saveNotification(this.notification).subscribe(
        res => {
          this.spinnerService.hide();
        },
        resError => { }
      );
    }
    if (this.action === 'edit') {
      this._notification
        .updateNotification(this.notification.id, this.notification)
        .subscribe(
          res => {
            this.spinnerService.hide();
          },
          resError => { }
        );
    }
  }

  public backToList() {
    this.router.navigate(['/list/notification']);
  }

  private checkLogin() {
    const user = UtilFunctions.getLocalStorage('user');
    if (user) {
      return;
    }
    this.router.navigate(['/login']);
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
