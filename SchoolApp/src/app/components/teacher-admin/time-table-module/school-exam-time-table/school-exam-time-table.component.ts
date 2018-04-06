import { Component, OnInit } from '@angular/core';
import { ExamTimeTable } from '../../../../models/exam-time-table.model';
import { Classes } from '../../../../models/classes.model';
import { Division } from '../../../../models/division.model';
import { Subject } from '../../../../models/subject.model';
import { Exam } from '../../../../models/exam.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ExamTimeTableService } from '../../../../services/exam-time-table.service';
import { ClassesService } from '../../../../services/classes.service';
import { DivisionService } from '../../../../services/division.service';
import { SubjectService } from '../../../../services/subject.service';
import { ExamService } from '../../../../services/exam.service';
import { Broadcaster } from '../../../../utils/broadcaster';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { UtilFunctions } from '../../../../utils/util-functions';
import { Labels } from '../../../../utils/labels';

@Component({
  selector: 'app-school-exam-time-table',
  templateUrl: './school-exam-time-table.component.html',
  styleUrls: ['./school-exam-time-table.component.css']
})
export class SchoolExamTimeTableComponent implements OnInit {

  action: string;
  viewFlag = false;
  examTT: ExamTimeTable;
  pageTitle: any;
  locale: any;
  formLocale: any;
  role: any;
  classObj: Classes;
  divisionObj: Division;
  subjectObj: Subject;
  examObj: Exam;
  classList: any;
  divisionList: any;
  examList: any;
  subjectList: any;

  constructor(private route: ActivatedRoute, private router: Router, private _examTT: ExamTimeTableService,
    private _class: ClassesService, private _division: DivisionService, private _subject: SubjectService,
    private _exam: ExamService, private broadcaster: Broadcaster, private spinnerService: Ng4LoadingSpinnerService) {
    this.route.params.subscribe((params) => {
      this.action = params['action'];
      this.role = UtilFunctions.getLocalStorage('role');
      this.initializeExamTimeTable();
      if (this.action === 'new') {
        this.viewFlag = false;
      }
      if (this.action === 'edit') {
        this.viewFlag = false;
        this.examTT = this.broadcaster.storage;
        this.processDate('show');
      }
      if (this.action === 'view') {
        this.viewFlag = true;
        this.examTT = this.broadcaster.storage;
        this.processDate('show');
      }
      this.locale = Labels.en_IN.labels.page_title;
      this.formLocale = Labels.en_IN.labels.form_labels;
      this.pageTitle = this.locale[this.action] + ' ' + this.locale.examTimeTable;
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
    this._exam.getExamList().subscribe((res) => {
      this.examList = res;
    }, (resError) => {
    });
  }

  private initializeExamTimeTable() {
    this.classObj = new Classes(null, '', '', null, null);
    this.divisionObj = new Division(null, '', '');
    this.subjectObj = new Subject(null, '', null, '');
    this.examObj = new Exam(null, '', '');
    this.examTT = new ExamTimeTable(null, this.examObj, this.classObj, this.divisionObj,
     this.subjectObj, '', '');
  }

  processDate(action) {
    if (action === 'show') {
      const temp = this.examTT.examDate.split('-');
      this.examTT.examDate = {
        day: Number(temp[2]),
        month: Number(temp[1]),
        year: Number(temp[0])
      };
    }

    if (action === 'save') {
      const temp = this.examTT.examDate.year + '-' + this.examTT.examDate.month + '-' + this.examTT.examDate.day;
      this.examTT.examDate = temp;
    }
  }

  public addExamTimeTable(data) {
    this.processDate('save');
    this.spinnerService.show();
    if (this.action === 'new') {
      this._examTT.saveExamTimeTable(this.examTT).subscribe((res) => {
        this.spinnerService.hide();
      }, (resError) => {
      });
    }
    if (this.action === 'edit') {
      this._examTT.updateExamTimeTable(this.examTT.id, this.examTT).subscribe((res) => {
        this.spinnerService.hide();
      }, (resError) => {
      });
    }
  }

  public backToList() {
    this.router.navigate(['/list/examTimeTable']);
  }

  private checkLogin() {
    const user = UtilFunctions.getLocalStorage('user');
    if (user) {
      return;
    }
    this.router.navigate(['/login']);
  }

}
