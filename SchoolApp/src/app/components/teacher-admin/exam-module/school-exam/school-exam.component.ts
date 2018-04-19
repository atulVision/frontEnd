import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppConfig } from '../../../../utils/app-config';
import { Labels } from '../../../../utils/labels';
import { Router } from '@angular/router';
import { UtilFunctions } from '../../../../utils/util-functions';
import { Exam } from '../../../../models/exam.model';
import { Broadcaster } from '../../../../utils/broadcaster';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ExamService } from '../../../../services/exam.service';

// Author : Tushar Upadhyay

@Component({
  selector: 'app-school-exam',
  templateUrl: './school-exam.component.html',
  styleUrls: ['./school-exam.component.css']
})
export class SchoolExamComponent implements OnInit {

  action: string;
  viewFlag = false;
  pageTitle: any;
  locale: any;
  formLocale: any;
  exam: Exam;

  constructor(private route: ActivatedRoute, private router: Router, private broadcaster: Broadcaster,
    private spinnerService: Ng4LoadingSpinnerService, private _exam: ExamService) {
    this.route.params.subscribe((params) => {
      this.action = params['action'];
      this.initializeExam();
      if (this.action === 'new') {
        this.viewFlag = false;
      }
      if (this.action === 'edit') {
        this.viewFlag = false;
        this.exam = this.broadcaster.storage;
      }
      if (this.action === 'view') {
        this.viewFlag = true;
        this.exam = this.broadcaster.storage;
      }
      this.locale = Labels.en_IN.labels.page_title;
      this.formLocale = Labels.en_IN.labels.form_labels;
      this.pageTitle = this.locale[this.action] + ' ' + this.locale.exam;
    });
  }

  ngOnInit() {
    this.checkLogin();
  }

  private initializeExam() {
    this.exam = new Exam(null, '', '');
  }

  public addExam(data) {
    this.spinnerService.show();
    if (this.action === 'new') {
      this._exam.saveExam(this.exam).subscribe((res) => {
        this.spinnerService.hide();
      }, (resError) => {
      });
    }
    if (this.action === 'edit') {
      this._exam.updateExam(this.exam.id, this.exam).subscribe((res) => {
        this.spinnerService.hide();
      }, (resError) => {
      });
    }
  }

  public backToList() {
    this.router.navigate(['/list/exam']);
  }

  private checkLogin() {
    const user = UtilFunctions.getLocalStorage('user');
    if (user) {
      return;
    }
    this.router.navigate(['/login']);
  }
}
