import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppConfig } from '../../../../utils/app-config';
import { Labels } from '../../../../utils/labels';
import { Router } from '@angular/router';
import { UtilFunctions } from '../../../../utils/util-functions';
import { Teacher } from '../../../../models/teacher.model';
import { TeacherService } from '../../../../services/teacher.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Broadcaster } from '../../../../utils/broadcaster';

@Component({
  selector: 'app-school-teacher',
  templateUrl: './school-teacher.component.html',
  styleUrls: ['./school-teacher.component.css']
})
export class SchoolTeacherComponent implements OnInit {

  action: string;
  viewFlag = false;
  teacher: Teacher;
  pageTitle: any;
  locale: any;
  formLocale: any;

  constructor(private route: ActivatedRoute, private router: Router, private _teacher: TeacherService,
    private broadcaster: Broadcaster, private spinnerService: Ng4LoadingSpinnerService) {
    this.route.params.subscribe((params) => {
      this.action = params['action'];
      this.initializeTeacher();
      if (this.action === 'new') {
        this.viewFlag = false;
      }
      if (this.action === 'edit') {
        this.viewFlag = false;
        this.teacher = this.broadcaster.storage;
        this.processDob('show');
      }
      if (this.action === 'view') {
        this.viewFlag = true;
        this.teacher = this.broadcaster.storage;
        this.processDob('show');
      }
      this.locale = Labels.en_IN.labels.page_title;
      this.formLocale = Labels.en_IN.labels.form_labels;
      this.pageTitle = this.locale[this.action] + ' ' + this.locale.teacher;
    });
  }

  ngOnInit() {
    this.checkLogin();
  }

  private initializeTeacher() {
    this.teacher = new Teacher(0, '', '', '', '', '', '', '', '', '');
  }

  public addTeacher(data) {
    this.spinnerService.show();
    this.processDob('save');
    if (this.action === 'new') {
      this._teacher.saveTeacher(this.teacher).subscribe((res) => {
        this.spinnerService.hide();
      }, (resError) => {
      });
    }
    if (this.action === 'edit') {
      this._teacher.updateTeacher(this.teacher.teacherId, this.teacher).subscribe((res) => {
        this.spinnerService.hide();
      }, (resError) => {
      });
    }
  }

  processDob(action) {
    if (action === 'show') {
      const temp = this.teacher.dob.split('-');
      this.teacher.dob = {
        day: Number(temp[2]),
        month: Number(temp[1]),
        year: Number(temp[0])
      };
    }

    if (action === 'save') {
      const temp = this.teacher.dob.year + '-' + this.teacher.dob.month + '-' + this.teacher.dob.day;
      this.teacher.dob = temp;
    }
  }

  public backToList() {
    this.router.navigate(['/list/teacher']);
  }

  private checkLogin() {
    const user = UtilFunctions.getLocalStorage('user');
    if (user) {
      return;
    }
    this.router.navigate(['/login']);
  }
}
