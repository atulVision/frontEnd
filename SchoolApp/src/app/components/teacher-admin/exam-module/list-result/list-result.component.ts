import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Broadcaster } from '../../../../utils/broadcaster';
import { ResultService } from '../../../../services/result.service';
import { ClassesService } from '../../../../services/classes.service';
import { DivisionService } from '../../../../services/division.service';
import { StudentService } from '../../../../services/student.service';
import { ExamService } from '../../../../services/exam.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Labels } from '../../../../utils/labels';
import { AppConfig } from '../../../../utils/app-config';
import { UtilFunctions } from '../../../../utils/util-functions';
import { Student } from '../../../../models/student.model';
import { Classes } from '../../../../models/classes.model';
import { Division } from '../../../../models/division.model';
import { Exam } from '../../../../models/exam.model';

@Component({
  selector: 'app-list-result',
  templateUrl: './list-result.component.html',
  styleUrls: ['./list-result.component.css']
})
export class ListResultComponent implements OnInit {
  filteredData = [];
  pageSize = 10;
  locale: any;
  commonLocale: any;
  deleteCache: any;
  rows = [];
  columns = [];
  filterColumns = [];
  ref: any;
  formLocale: any;
  classList: any;
  divisionList: any;
  studentList: any;
  examList: any;
  obj: Obj;
  studentObj: Student;
  classObj: Classes;
  divisionObj: Division;
  examObj: Exam;

  constructor(private router: Router, private broadcaster: Broadcaster,
    private _result: ResultService, private _class: ClassesService,
    private _division: DivisionService, private _student: StudentService,
    private _exam: ExamService, private spinnerService: Ng4LoadingSpinnerService) {
  }

  ngOnInit() {
    this.rows = [];
    this.checkLogin();
    this.spinnerService.show();
    this.getList();
    this.spinnerService.hide();
    this.obj = new Obj(null, null, null, null);
    this.initializeTable();
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
    this._student.getStudentList().subscribe((res) => {
      this.studentList = res;
    }, (resError) => {
    });
    this._exam.getExamList().subscribe((res) => {
      this.examList = res;
    }, (resError) => {
    });
  }

  initializeTable() {
    this.commonLocale = Labels.en_IN.labels.table.common;
    this.locale = Labels.en_IN.labels.table.result;
    this.columns = AppConfig.result;
    this.ref = AppConfig.tableNavigationConfig.result;
    this.filterColumns = this.columns;
    this.formLocale = Labels.en_IN.labels.form_labels;
  }

  getUpdatedList(data, action) {
    this.spinnerService.show();
    this._result.getResultList(this.obj).subscribe((res) => {
      if (res.length > 0) {
        this.classObj = res[0].classes;
        this.divisionObj = res[0].division;
        this.studentObj = res[0].student;
        this.examObj = res[0].examId;
        this.rows = res[0].studentMarks;
        this.filteredData = this.rows;
      }

      this.spinnerService.hide();
    }, (resError) => {
    });
  }

  view(row: any) {
    this.broadcaster.storage = row;
    this.router.navigate([this.ref.viewRef]);
  }

  edit(row: any) {
    this.broadcaster.storage = row;
    this.router.navigate([this.ref.editRef]);
  }

  delete(row: any, go: any) {
    this.spinnerService.show();
    if (go) {
      this._result.deleteResult(this.deleteCache.id).subscribe((res) => {
      }, (resError) => {
      });
      this.ngOnInit();
      this.spinnerService.hide();
    } else {
      this.deleteCache = row;
      this.spinnerService.hide();
    }
  }

  setPageSize(size: any) {
    this.pageSize = size;
  }

  checkLogin() {
    const user = UtilFunctions.getLocalStorage('user');
    if (user) {
      return;
    }
    this.router.navigate(['/login']);
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    const keys = [''];
    const colAmt = keys.length;
    this.rows = this.filteredData.filter(function (item) {
      for (let i = 0; i < colAmt; i++) {
        if (item[keys[i]].toLowerCase().indexOf(val) !== -1 || !val) {
          return true;
        }
      }
    });
  }
}

class Obj {
  public studentId: number;
  public classId: number;
  public divisionId: number;
  public examId: number;

  constructor(studentId: number, classId: number, divisionId: number, examId: number) {
    this.studentId = studentId;
    this.classId = classId;
    this.divisionId = divisionId;
    this.examId = examId;
  }
}
