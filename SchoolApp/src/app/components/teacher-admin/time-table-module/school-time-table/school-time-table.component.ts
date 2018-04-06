import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppConfig } from '../../../../utils/app-config';
import { Labels } from '../../../../utils/labels';
import { Router } from '@angular/router';
import { UtilFunctions } from '../../../../utils/util-functions';
import { TimeTable } from '../../../../models/time-table.model';
import { Classes } from '../../../../models/classes.model';
import { Division } from '../../../../models/division.model';
import { Subject } from '../../../../models/subject.model';
import { TimeTableService } from '../../../../services/time-table.service';
import { ClassesService } from '../../../../services/classes.service';
import { DivisionService } from '../../../../services/division.service';
import { SubjectService } from '../../../../services/subject.service';
import { Broadcaster } from '../../../../utils/broadcaster';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { DayService } from '../../../../services/day.service';
import { Day } from '../../../../models/day.model';

@Component({
  selector: 'app-school-time-table',
  templateUrl: './school-time-table.component.html',
  styleUrls: ['./school-time-table.component.css']
})
export class SchoolTimeTableComponent implements OnInit {

  action: string;
  viewFlag = false;
  timeT: TimeTable;
  pageTitle: any;
  locale: any;
  formLocale: any;
  role: any;
  classObj: Classes;
  divisionObj: Division;
  subjectObj: Subject;
  dayObj: Day;
  classList: any;
  divisionList: any;
  subjectList: any;
  dayList: any;

  constructor(private route: ActivatedRoute, private router: Router, private _timeT: TimeTableService,
    private _class: ClassesService, private _division: DivisionService, private _subject: SubjectService,
    private _day: DayService, private broadcaster: Broadcaster, private spinnerService: Ng4LoadingSpinnerService) {
    this.route.params.subscribe((params) => {
      this.action = params['action'];
      this.role = UtilFunctions.getLocalStorage('role');
      this.initializeTimeTable();
      if (this.action === 'new') {
        this.viewFlag = false;
      }
      if (this.action === 'edit') {
        this.viewFlag = false;
        this.timeT = this.broadcaster.storage;
        this.processTime('show');
      }
      if (this.action === 'view') {
        this.viewFlag = true;
        this.timeT = this.broadcaster.storage;
        this.processTime('show');
      }
      this.locale = Labels.en_IN.labels.page_title;
      this.formLocale = Labels.en_IN.labels.form_labels;
      this.pageTitle = this.locale[this.action] + ' ' + this.locale.timeTable;
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
    this._day.getDaysList().subscribe((res) => {
      this.dayList = res;
    }, (resError) => {
    });
  }

  private initializeTimeTable() {
    this.classObj = new Classes(null, '', '', null, null);
    this.divisionObj = new Division(null, '', '');
    this.subjectObj = new Subject(null, '', null, '');
    this.dayObj = new Day (null, '');
    this.timeT = new TimeTable(null, '', this.classObj, this.divisionObj,
      this.subjectObj, this.dayObj, '');
  }

  processTime(action) {
    if (action === 'show') {
      const temp = this.timeT.time.split(':');
      this.timeT.time = {
        hour: Number(temp[0]),
        minute: Number(temp[1]),
        second: Number(temp[2])
      };
    }

    if (action === 'save') {
      const temp = this.timeT.time.hour + ':' + this.timeT.time.minute + ':' + this.timeT.time.second;
      this.timeT.time = temp;
    }
  }

  public addTimeTable(data) {
    this.processTime('save');
    this.spinnerService.show();
    if (this.action === 'new') {
      this._timeT.saveTimeTable(this.timeT).subscribe((res) => {
        this.spinnerService.hide();
      }, (resError) => {
      });
    }
    if (this.action === 'edit') {
      this._timeT.updateTimeTable(this.timeT.id, this.timeT).subscribe((res) => {
        this.spinnerService.hide();
      }, (resError) => {
      });
    }
  }

  public backToList() {
    this.router.navigate(['/list/timeTable']);
  }

  private checkLogin() {
    const user = UtilFunctions.getLocalStorage('user');
    if (user) {
      return;
    }
    this.router.navigate(['/login']);
  }

}
