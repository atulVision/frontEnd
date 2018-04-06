import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppConfig } from '../../../../utils/app-config';
import { Labels } from '../../../../utils/labels';
import { Router } from '@angular/router';
import { UtilFunctions } from '../../../../utils/util-functions';
import { Attendance } from '../../../../models/attendance.model';
import { Classes } from '../../../../models/classes.model';
import { Division } from '../../../../models/division.model';
import { Subject } from '../../../../models/subject.model';
import { AttendanceService } from '../../../../services/attendance.service';
import { ClassesService } from '../../../../services/classes.service';
import { DivisionService } from '../../../../services/division.service';
import { SubjectService } from '../../../../services/subject.service';
import { Broadcaster } from '../../../../utils/broadcaster';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-school-attendance',
  templateUrl: './school-attendance.component.html',
  styleUrls: ['./school-attendance.component.css']
})
export class SchoolAttendanceComponent implements OnInit {

  action: string;
  viewFlag = false;
  attendance: Attendance;
  pageTitle: any;
  locale: any;
  formLocale: any;
  role: any;
  classObj: Classes;
  divisionObj: Division;
  subjectObj: Subject;
  classList: any;
  divisionList: any;
  subjectList: any;

  constructor(private route: ActivatedRoute, private router: Router, private _attendance: AttendanceService,
    private _class: ClassesService, private _division: DivisionService, private _subject: SubjectService,
    private broadcaster: Broadcaster, private spinnerService: Ng4LoadingSpinnerService) {
    this.route.params.subscribe((params) => {
      this.action = params['action'];
      this.role = UtilFunctions.getLocalStorage('role');
      this.initializeHomeWork();
      if (this.action === 'new') {
        this.viewFlag = false;
      }
      if (this.action === 'edit') {
        this.viewFlag = false;
        this.attendance = this.broadcaster.storage;
        this.processDate('show');
        this.processTime('show');
      }
      if (this.action === 'view') {
        this.viewFlag = true;
        this.attendance = this.broadcaster.storage;
        this.processDate('show');
        this.processTime('show');
      }
      this.locale = Labels.en_IN.labels.page_title;
      this.formLocale = Labels.en_IN.labels.form_labels;
      this.pageTitle = this.locale[this.action] + ' ' + this.locale.homeWork;
    });
  }

  ngOnInit() {
    this.checkLogin();
    this.spinnerService.show();
    this.getList();
    this.spinnerService.hide();
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

  private initializeHomeWork() {
    this.classObj = new Classes(null, '', '', null, null);
    this.divisionObj = new Division(null, '', '');
    this.subjectObj = new Subject(null, '', null, '');
    this.attendance = new Attendance(null, '', '', '', '', '', '', '');
  }

  processDate(action) {
    if (action === 'show') {
      const temp = this.attendance.date.split('-');
      this.attendance.date = {
        day: Number(temp[2]),
        month: Number(temp[1]),
        year: Number(temp[0])
      };
    }

    if (action === 'save') {
      const temp = this.attendance.date.year + '-' + this.attendance.date.month + '-' + this.attendance.date.day;
      this.attendance.date = temp;
    }
  }

  processTime(action) {
    if (action === 'show') {
      const temp = this.attendance.time.split(':');
      this.attendance.time = {
        hour: Number(temp[0]),
        minute: Number(temp[1]),
        second: Number(temp[2])
      };
    }

    if (action === 'save') {
      const temp = this.attendance.time.hour + ':' + this.attendance.time.minute + ':' + this.attendance.time.second;
      this.attendance.time = temp;
    }
  }

  public addHomeWork(data) {
    this.processDate('save');
    this.processTime('save');
    this.spinnerService.show();
    if (this.action === 'new') {
      this._attendance.saveAttendance(this.attendance).subscribe((res) => {
        this.spinnerService.hide();
      }, (resError) => {
      });
    }
    if (this.action === 'edit') {
      this._attendance.updateAttendance(this.attendance.attendanceId, this.attendance).subscribe((res) => {
        this.spinnerService.hide();
      }, (resError) => {
      });
    }
  }

  public backToList() {
    this.router.navigate(['/list/homeW']);
  }

  private checkLogin() {
    const user = UtilFunctions.getLocalStorage('user');
    if (user) {
      return;
    }
    this.router.navigate(['/login']);
  }

}
