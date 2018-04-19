import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppConfig } from '../../../../utils/app-config';
import { Labels } from '../../../../utils/labels';
import { Router } from '@angular/router';
import { UtilFunctions } from '../../../../utils/util-functions';
import { Result, StudentMarks } from '../../../../models/result.model';
import { Classes } from '../../../../models/classes.model';
import { Division } from '../../../../models/division.model';
import { Subject } from '../../../../models/subject.model';
import { Teacher } from '../../../../models/teacher.model';
import { Student } from '../../../../models/student.model';
import { ResultService } from '../../../../services/result.service';
import { ClassesService } from '../../../../services/classes.service';
import { DivisionService } from '../../../../services/division.service';
import { SubjectService } from '../../../../services/subject.service';
import { StudentService } from '../../../../services/student.service';
import { Broadcaster } from '../../../../utils/broadcaster';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Exam } from '../../../../models/exam.model';
import { ExamService } from '../../../../services/exam.service';
import { Route } from '../../../../models/route.model';
import { BusStop } from '../../../../models/bus-stop.model';

@Component({
  selector: 'app-school-result',
  templateUrl: './school-result.component.html',
  styleUrls: ['./school-result.component.css']
})
export class SchoolResultComponent implements OnInit {
  action: string;
  viewFlag = false;
  result: Result;
  pageTitle: any;
  locale: any;
  formLocale: any;
  role: any;
  classObj: Classes;
  divisionObj: Division;
  subjectObj: Subject;
  teacherObj: Teacher;
  studentObj: Student;
  examObj: Exam;
  studentMarkObj: StudentMarks;
  studentMarksList: Array<StudentMarks>;
  classList: any;
  divisionList: any;
  subjectList: any;
  studentList: any;
  examList: any;
  obj: Obj;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _result: ResultService,
    private _class: ClassesService,
    private _division: DivisionService,
    private _subject: SubjectService,
    private _student: StudentService,
    private _exam: ExamService,
    private broadcaster: Broadcaster,
    private spinnerService: Ng4LoadingSpinnerService
  ) {
    this.route.params.subscribe(params => {
      this.action = params['action'];
      this.role = UtilFunctions.getLocalStorage('role');
      this.initializeResult();
      if (this.action === 'new') {
        this.viewFlag = false;
      }
      if (this.action === 'edit') {
        this.viewFlag = false;
        this.result = this.broadcaster.storage;
        this.processDate('show');
      }
      if (this.action === 'view') {
        this.viewFlag = true;
        this.result = this.broadcaster.storage;
        this.processDate('show');
      }
      this.locale = Labels.en_IN.labels.page_title;
      this.formLocale = Labels.en_IN.labels.form_labels;
      this.pageTitle = this.locale[this.action] + ' ' + this.locale.result;
    });
  }

  ngOnInit() {
    this.checkLogin();
    this.spinnerService.show();
    this.getList();
  }

  private getList() {
    this._class.getClassList().subscribe(
      res => {
        this.classList = res;
      },
      resError => { }
    );
    this._division.getDivisionList().subscribe(
      res => {
        this.divisionList = res;
      },
      resError => { }
    );
    this._subject.getSubjectList().subscribe(
      res => {
        this.subjectList = res;
      },
      resError => { }
    );
    this._exam.getExamList().subscribe(
      res => {
        this.spinnerService.hide();
        this.examList = res;
      },
      resError => { }
    );
  }

  private initializeResult() {
    this.studentList = [];
    this.obj = new Obj(null, null);
    this.classObj = new Classes(null, '', '', null, null);
    this.divisionObj = new Division(null, '', '');
    this.examObj = new Exam(null, '', '');
    this.subjectObj = new Subject(null, '', null, '');
    this.studentObj = new Student(null, '', '', '', '', '', '', '', '', '', '', '', '', '',
      this.classObj, this.divisionObj, '', '', '', '', new Route(null, '', null, null), new BusStop(null, '', '', ''), '', '');
    this.studentMarkObj = new StudentMarks(null, 0, 0, '', this.subjectObj);
    this.studentMarksList = [];
    this.result = new Result( null, this.classObj, this.divisionObj, this.studentObj, this.examObj,
      this.studentMarksList, '');
  }

  processDate(action) {
    if (action === 'show') {
      const temp = this.result.resultDate.split('-');
      this.result.resultDate = {
        day: Number(temp[2]),
        month: Number(temp[1]),
        year: Number(temp[0])
      };
    }

    if (action === 'save') {
      const temp =
        this.result.resultDate.year +
        '-' +
        this.result.resultDate.month +
        '-' +
        this.result.resultDate.day;
      this.result.resultDate = temp;
    }
  }

  public getStudents() {
    this.obj.classId = this.result.classes.id;
    this.obj.divisionId = this.result.division.id;
    this._student.getClassDivStudentList(this.obj).subscribe(
      res => {
        this.studentList = res;
      },
      resError => { }
    );
  }

  public addMarks() {
    this.studentMarksList.push(this.studentMarkObj);
    this.subjectObj = new Subject(null, '', null, '');
    this.studentMarkObj = new StudentMarks(null, 0, 0, '', this.subjectObj);
  }

  public deleteMarks(index) {
    this.studentMarksList.splice(index, 1);
  }

  public addResult(data) {
    this.processDate('save');
    this.spinnerService.show();
    if (this.action === 'new') {
      this._result.saveResult(this.result).subscribe(
        res => {
          this.spinnerService.hide();
        },
        resError => { }
      );
    }
    if (this.action === 'edit') {
      this._result
        .updateResult(this.result.id, this.result)
        .subscribe(
          res => {
            this.spinnerService.hide();
          },
          resError => { }
        );
    }
  }

  public backToList() {
    this.router.navigate(['/list/result']);
  }

  private checkLogin() {
    const user = UtilFunctions.getLocalStorage('user');
    if (user) {
      return;
    }
    this.router.navigate(['/login']);
  }
}

class Obj {
  public classId: number;
  public divisionId: number;

  constructor(classId: number, divisionId: number) {
    this.classId = classId;
    this.divisionId = divisionId;
  }
}
