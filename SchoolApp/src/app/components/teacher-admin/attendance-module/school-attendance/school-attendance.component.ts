import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppConfig } from '../../../../utils/app-config';
import { Labels } from '../../../../utils/labels';
import { Router } from '@angular/router';
import { UtilFunctions } from '../../../../utils/util-functions';
import { Attendance, StudentAttendance } from '../../../../models/attendance.model';
import { Classes } from '../../../../models/classes.model';
import { Division } from '../../../../models/division.model';
import { Subject } from '../../../../models/subject.model';
import { AttendanceService } from '../../../../services/attendance.service';
import { ClassesService } from '../../../../services/classes.service';
import { DivisionService } from '../../../../services/division.service';
import { SubjectService } from '../../../../services/subject.service';
import { Broadcaster } from '../../../../utils/broadcaster';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { TeacherService } from '../../../../services/teacher.service';
import { StudentService } from '../../../../services/student.service';
import { Teacher } from '../../../../models/teacher.model';
import { Student } from '../../../../models/student.model';
import { Route } from '../../../../models/route.model';
import { BusStop } from '../../../../models/bus-stop.model';

@Component({
  selector: 'app-school-attendance',
  templateUrl: './school-attendance.component.html',
  styleUrls: ['./school-attendance.component.css']
})
export class SchoolAttendanceComponent implements OnInit {
  action: string;
  viewFlag = false;
  attendance: Attendance;
  pageTitle: any;
  locale: any;
  formLocale: any;
  role: any;
  classObj: Classes;
  divisionObj: Division;
  subjectObj: Subject;
  teacherObj: Teacher;
  studentObj: Student;
  studentAttendanceObj: StudentAttendance;
  studentAttendanceList: Array<StudentAttendance>;
  classList: any;
  divisionList: any;
  subjectList: any;
  teacherList: any;
  studentList: any;
obj: Obj;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _attendance: AttendanceService,
    private _class: ClassesService,
    private _division: DivisionService,
    private _subject: SubjectService,
    private _teacher: TeacherService,
    private _student: StudentService,
    private broadcaster: Broadcaster,
    private spinnerService: Ng4LoadingSpinnerService
  ) {
    this.route.params.subscribe(params => {
      this.action = params['action'];
      this.role = UtilFunctions.getLocalStorage('role');
      this.initializeAttendance();
      if (this.action === 'new') {
        this.viewFlag = false;
      }
      if (this.action === 'edit') {
        this.viewFlag = false;
        this.attendance = this.broadcaster.storage;
        this.processDate('show');
        this.processTime('show');
      }
      if (this.action === 'view') {
        this.viewFlag = true;
        this.attendance = this.broadcaster.storage;
        this.processDate('show');
        this.processTime('show');
      }
      this.locale = Labels.en_IN.labels.page_title;
      this.formLocale = Labels.en_IN.labels.form_labels;
      this.pageTitle = this.locale[this.action] + ' ' + this.locale.attendance;
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
      resError => {}
    );
    this._division.getDivisionList().subscribe(
      res => {
        this.divisionList = res;
      },
      resError => {}
    );
    this._subject.getSubjectList().subscribe(
      res => {
        this.subjectList = res;
      },
      resError => {}
    );
    this._teacher.getTeacherList().subscribe(
      res => {
        this.spinnerService.hide();
        this.teacherList = res;
      },
      resError => {}
    );
  }

  private initializeAttendance() {
    this.obj = new Obj (null, null);
    this.classObj = new Classes(null, '', '', null, null);
    this.divisionObj = new Division(null, '', '');
    this.subjectObj = new Subject(null, '', null, '');
    this.teacherObj = new Teacher (null, '', '', '', '', '', '', '', '', '');
    this.studentObj = new Student(null, '', '', '', '', '', '', '', '', '', '', '', '', '',
      this.classObj, this.divisionObj, '', '', '', '', new Route(null, '', null, null), new BusStop(null, '', '', ''), '', '');
    this.studentAttendanceObj = new StudentAttendance (null, '', this.studentObj);
    this.studentAttendanceList = [];
    this.attendance = new Attendance(
      null,
      this.classObj,
      this.divisionObj,
      '',
      '',
      this.subjectObj,
      this.studentAttendanceList,
      this.teacherObj
    );
  }

  processDate(action) {
    if (action === 'show') {
      const temp = this.attendance.attendanceDate.split('-');
      this.attendance.attendanceDate = {
        day: Number(temp[2]),
        month: Number(temp[1]),
        year: Number(temp[0])
      };
    }

    if (action === 'save') {
      const temp =
        this.attendance.attendanceDate.year +
        '-' +
        this.attendance.attendanceDate.month +
        '-' +
        this.attendance.attendanceDate.day;
      this.attendance.attendanceDate = temp;
    }
  }

  processTime(action) {
    if (action === 'show') {
      const temp = this.attendance.attendanceTime.split(':');
      this.attendance.attendanceTime = {
        hour: Number(temp[0]),
        minute: Number(temp[1]),
        second: Number(temp[2])
      };
    }

    if (action === 'save') {
      const temp =
        this.attendance.attendanceTime.hour +
        ':' +
        this.attendance.attendanceTime.minute +
        ':' +
        this.attendance.attendanceTime.second;
      this.attendance.attendanceTime = temp;
    }
  }

  public getStudents() {
    this.obj.classId = this.attendance.classes.id;
    this.obj.divisionId = this.attendance.division.id;
    this._student.getClassDivStudentList(this.obj).subscribe(
      res => {
        this.studentList = res;
        this.processStudentList();
      },
      resError => {}
    );
  }

  private processStudentList() {
    this.studentList.forEach(student => {
      const temp = new StudentAttendance (null, '', null);
      temp.student = student;
      this.studentAttendanceList.push(temp);
    });
  }

  public onSelection(obj, value) {
    obj.attandandceFlag = value;
  }

  public selectAll(value) {
    this.studentAttendanceList.forEach(element => {
      element.attandandceFlag = value;
    });
  }
  public addAttendance(data) {
    this.processDate('save');
    this.processTime('save');
    this.spinnerService.show();
    if (this.action === 'new') {
      this._attendance.saveAttendance(this.attendance).subscribe(
        res => {
          this.spinnerService.hide();
        },
        resError => {}
      );
    }
    if (this.action === 'edit') {
      this._attendance
        .updateAttendance(this.attendance.attendanceId, this.attendance)
        .subscribe(
          res => {
            this.spinnerService.hide();
          },
          resError => {}
        );
    }
  }

  public backToList() {
    this.router.navigate(['/list/attendance']);
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
