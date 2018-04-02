import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppConfig } from '../../../../utils/app-config';
import { Labels } from '../../../../utils/labels';
import { Router } from '@angular/router';
import { UtilFunctions } from '../../../../utils/util-functions';
import { Student } from '../../../../models/student.model';
import { StudentService } from '../../../../services/student.service';
import { Broadcaster } from '../../../../utils/broadcaster';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Classes } from '../../../../models/classes.model';
import { Division } from '../../../../models/division.model';
import { Route } from '../../../../models/route.model';
import { BusStop } from '../../../../models/bus-stop.model';
import { ClassesService } from '../../../../services/classes.service';
import { DivisionService } from '../../../../services/division.service';
import { RouteService } from '../../../../services/route.service';
import { BusService } from '../../../../services/bus.service';
import { BusStopService } from '../../../../services/bus-stop.service';

@Component({
  selector: 'app-school-student',
  templateUrl: './school-student.component.html',
  styleUrls: ['./school-student.component.css']
})
export class SchoolStudentComponent implements OnInit {

  action: string;
  viewFlag = false;
  student: Student;
  pageTitle: any;
  locale: any;
  formLocale: any;
  role: any;
  classObj: Classes;
  divisionObj: Division;
  routeObj: Route;
  busStopObj: BusStop;
  classList: any;
  divisionList: any;
  routeList: any;
  busStopList: any;

  constructor(private route: ActivatedRoute, private router: Router, private _student: StudentService,
    private _class: ClassesService, private _division: DivisionService, private _route: RouteService,
    private _busStop: BusStopService, private broadcaster: Broadcaster, private spinnerService: Ng4LoadingSpinnerService) {
    this.route.params.subscribe((params) => {
      this.action = params['action'];
      this.role = UtilFunctions.getLocalStorage('role');
      this.initializeStudent();
      if (this.action === 'new') {
        this.viewFlag = false;
      }
      if (this.action === 'edit') {
        this.viewFlag = false;
        this.student = this.broadcaster.storage;
        this.processDob('show');
      }
      if (this.action === 'view') {
        this.viewFlag = true;
        this.student = this.broadcaster.storage;
        this.processDob('show');
      }
      this.locale = Labels.en_IN.labels.page_title;
      this.formLocale = Labels.en_IN.labels.form_labels;
      this.pageTitle = this.locale[this.action] + ' ' + this.locale.student;
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
    this._route.getRouteList().subscribe((res) => {
      this.routeList = res;
    }, (resError) => {
    });
    this._busStop.getBusStopList().subscribe((res) => {
      this.busStopList = res;
    }, (resError) => {
    });
  }

  private initializeStudent() {
    this.classObj = new Classes(null, '', '', null, null);
    this.divisionObj = new Division(null, '', '');
    this.routeObj = new Route(null, '', null, null);
    this.busStopObj = new BusStop(null, '', '', '');
    this.student = new Student(null, '', '', '', '', '', '', '', '', '', '', '', '', '',
      this.classObj, this.divisionObj, '', '', '', '', this.routeObj, this.busStopObj, '', '');
  }

  processDob(action) {
    if (action === 'show') {
      const temp = this.student.dob.split('-');
      const temp2 = this.student.admissionDate.split('-');
      this.student.dob = {
        day: Number(temp[2]),
        month: Number(temp[1]),
        year: Number(temp[0])
      };
      this.student.admissionDate = {
        day: Number(temp2[2]),
        month: Number(temp2[1]),
        year: Number(temp2[0])
      };
    }

    if (action === 'save') {
      const temp = this.student.dob.year + '-' + this.student.dob.month + '-' + this.student.dob.day;
      const temp2 = this.student.admissionDate.year + '-' + this.student.admissionDate.month + '-' + this.student.admissionDate.day;
      this.student.dob = temp;
      this.student.admissionDate = temp2;
    }
  }

  public addStudent(data) {
    this.processDob('save');
    console.log(JSON.stringify(this.student));
    this.spinnerService.show();
    if (this.action === 'new') {
      this._student.saveStudent(this.student).subscribe((res) => {
        this.spinnerService.hide();
      }, (resError) => {
      });
    }
    if (this.action === 'edit') {
      this._student.updateStudent(this.student.studentId, this.student).subscribe((res) => {
        this.spinnerService.hide();
      }, (resError) => {
      });
    }
  }

  public backToList() {
    this.router.navigate(['/list/student']);
  }

  private checkLogin() {
    const user = UtilFunctions.getLocalStorage('user');
    if (user) {
      return;
    }
    this.router.navigate(['/login']);
  }

}
