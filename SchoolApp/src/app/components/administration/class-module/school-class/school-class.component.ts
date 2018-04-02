import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppConfig } from '../../../../utils/app-config';
import { Labels } from '../../../../utils/labels';
import { Router } from '@angular/router';
import { UtilFunctions } from '../../../../utils/util-functions';
import { Classes } from '../../../../models/classes.model';
import { ClassesService } from '../../../../services/classes.service';
import { Broadcaster } from '../../../../utils/broadcaster';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Division } from '../../../../models/division.model';
import { Teacher } from '../../../../models/teacher.model';
import { DivisionService } from '../../../../services/division.service';
import { TeacherService } from '../../../../services/teacher.service';

@Component({
  selector: 'app-school-class',
  templateUrl: './school-class.component.html',
  styleUrls: ['./school-class.component.css']
})
export class SchoolClassComponent implements OnInit {

  action: string;
  viewFlag = false;
  classes: Classes;
  pageTitle: any;
  locale: any;
  formLocale: any;
  division: Division;
  teacher: Teacher;
  divisionList: any;
  teacherList: any;

  constructor(private route: ActivatedRoute, private router: Router, private _class: ClassesService,
    private broadcaster: Broadcaster, private spinnerService: Ng4LoadingSpinnerService, private _division: DivisionService,
    private _teacher: TeacherService) {
    this.route.params.subscribe((params) => {
      this.action = params['action'];
      this.initializeClass();
      if (this.action === 'new') {
        this.viewFlag = false;
      }
      if (this.action === 'edit') {
        this.viewFlag = false;
        this.classes = this.broadcaster.storage;
      }
      if (this.action === 'view') {
        this.viewFlag = true;
        this.classes = this.broadcaster.storage;
      }
      this.locale = Labels.en_IN.labels.page_title;
      this.formLocale = Labels.en_IN.labels.form_labels;
      this.pageTitle = this.locale[this.action] + ' ' + this.locale.class;
    });
  }

  ngOnInit() {
    this.checkLogin();
    this.spinnerService.show();
    this.getList();
    this.spinnerService.hide();
  }

  private getList() {
    this._division.getDivisionList().subscribe((res) => {
      this.divisionList = res;
    }, (resError) => {
    });
    this._teacher.getTeacherList().subscribe((res) => {
      this.teacherList = res;
    }, (resError) => {
    });
  }

  private initializeClass() {
    this.division = new Division(null, '', '');
    this.teacher = new Teacher(null, '', '', '', '', '', '', '', '', '');
    this.classes = new Classes(null, '', '', this.division, this.teacher);
  }

  public addClass(data) {
    console.log(JSON.stringify(this.classes));
    this.spinnerService.show();
    if (this.action === 'new') {
      this._class.saveClass(this.classes).subscribe((res) => {
        console.log(res);
        this.spinnerService.hide();
      }, (resError) => {
      });
    }
    if (this.action === 'edit') {
      this._class.updateClass(this.classes.id, this.classes).subscribe((res) => {
        console.log(res);
        this.spinnerService.hide();
      }, (resError) => {
      });
    }
  }

  public backToList() {
    this.router.navigate(['/list/class']);
  }

  private checkLogin() {
    const user = UtilFunctions.getLocalStorage('user');
    if (user) {
      return;
    }
    this.router.navigate(['/login']);
  }
}
