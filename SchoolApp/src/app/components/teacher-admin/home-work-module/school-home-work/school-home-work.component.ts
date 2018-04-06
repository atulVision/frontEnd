import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppConfig } from '../../../../utils/app-config';
import { Labels } from '../../../../utils/labels';
import { Router } from '@angular/router';
import { UtilFunctions } from '../../../../utils/util-functions';
import { HomeWork } from '../../../../models/home-work.model';
import { Classes } from '../../../../models/classes.model';
import { Division } from '../../../../models/division.model';
import { Subject } from '../../../../models/subject.model';
import { HomeWorkService } from '../../../../services/home-work.service';
import { ClassesService } from '../../../../services/classes.service';
import { DivisionService } from '../../../../services/division.service';
import { SubjectService } from '../../../../services/subject.service';
import { Broadcaster } from '../../../../utils/broadcaster';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-school-home-work',
  templateUrl: './school-home-work.component.html',
  styleUrls: ['./school-home-work.component.css']
})
export class SchoolHomeWorkComponent implements OnInit {

  action: string;
  viewFlag = false;
  homeW: HomeWork;
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

  constructor(private route: ActivatedRoute, private router: Router, private _homeW: HomeWorkService,
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
        this.homeW = this.broadcaster.storage;
        this.processDate('show');
      }
      if (this.action === 'view') {
        this.viewFlag = true;
        this.homeW = this.broadcaster.storage;
        this.processDate('show');
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
    this.homeW = new HomeWork(null, '', '', '', this.classObj, this.divisionObj,
      this.subjectObj, false);
  }

  processDate(action) {
    if (action === 'show') {
      const temp = this.homeW.homeWorkDate.split('-');
      this.homeW.homeWorkDate = {
        day: Number(temp[2]),
        month: Number(temp[1]),
        year: Number(temp[0])
      };
    }

    if (action === 'save') {
      const temp = this.homeW.homeWorkDate.year + '-' + this.homeW.homeWorkDate.month + '-' + this.homeW.homeWorkDate.day;
      this.homeW.homeWorkDate = temp;
    }
  }

  public addHomeWork(data) {
    this.processDate('save');
    this.spinnerService.show();
    if (this.action === 'new') {
      this._homeW.saveHomeWork(this.homeW).subscribe((res) => {
        this.spinnerService.hide();
      }, (resError) => {
      });
    }
    if (this.action === 'edit') {
      this._homeW.updateHomeWork(this.homeW.homeWorkId, this.homeW).subscribe((res) => {
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
