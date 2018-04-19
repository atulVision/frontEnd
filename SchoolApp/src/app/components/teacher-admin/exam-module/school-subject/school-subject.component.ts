import { Component, OnInit } from '@angular/core';
import { UtilFunctions } from '../../../../utils/util-functions';
import { Classes } from '../../../../models/classes.model';
import { Subject } from '../../../../models/subject.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ClassesService } from '../../../../services/classes.service';
import { Broadcaster } from '../../../../utils/broadcaster';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { SubjectService } from '../../../../services/subject.service';
import { Division } from '../../../../models/division.model';
import { Teacher } from '../../../../models/teacher.model';
import { Labels } from '../../../../utils/labels';

// Author : Tushar Upadhyay

@Component({
  selector: 'app-school-subject',
  templateUrl: './school-subject.component.html',
  styleUrls: ['./school-subject.component.css']
})
export class SchoolSubjectComponent implements OnInit {

  action: string;
  viewFlag = false;
  division: Division;
  teacher: Teacher;
  classes: Classes;
  pageTitle: any;
  locale: any;
  formLocale: any;
  subject: Subject;
  classList: any;

  constructor(private route: ActivatedRoute, private router: Router, private _class: ClassesService,
    private broadcaster: Broadcaster, private spinnerService: Ng4LoadingSpinnerService, private _subject: SubjectService) {
    this.route.params.subscribe((params) => {
      this.action = params['action'];
      this.initializeSubject();
      if (this.action === 'new') {
        this.viewFlag = false;
      }
      if (this.action === 'edit') {
        this.viewFlag = false;
        this.subject = this.broadcaster.storage;
      }
      if (this.action === 'view') {
        this.viewFlag = true;
        this.subject = this.broadcaster.storage;
      }
      this.locale = Labels.en_IN.labels.page_title;
      this.formLocale = Labels.en_IN.labels.form_labels;
      this.pageTitle = this.locale[this.action] + ' ' + this.locale.subject;
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
  }

  private initializeSubject() {
    this.division = new Division(null, '', '');
    this.teacher = new Teacher(null, '', '', '', '', '', '', '', '', '');
    this.classes = new Classes(null, '', '', this.division, this.teacher);
    this.subject = new Subject (null, '', this.classes, '');
  }

  public addSubject(data) {
    this.spinnerService.show();
    if (this.action === 'new') {
      this._subject.saveSubject(this.subject).subscribe((res) => {
        this.spinnerService.hide();
      }, (resError) => {
      });
    }
    if (this.action === 'edit') {
      this._subject.updateSubject(this.subject.subjectId, this.subject).subscribe((res) => {
        this.spinnerService.hide();
      }, (resError) => {
      });
    }
  }

  public backToList() {
    this.router.navigate(['/list/subject']);
  }

  private checkLogin() {
    const user = UtilFunctions.getLocalStorage('user');
    if (user) {
      return;
    }
    this.router.navigate(['/login']);
  }
}
