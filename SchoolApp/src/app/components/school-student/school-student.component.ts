import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppConfig } from '../../utils/app-config';
import { Labels } from '../../utils/labels';
import { Router } from '@angular/router';
import { UtilFunctions } from '../../utils/util-functions';
import { Student } from '../../models/student.model';
import { StudentService } from '../../services/student.service';
import { Broadcaster } from '../../utils/broadcaster';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

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

  constructor(private route: ActivatedRoute, private router: Router, private _student: StudentService,
    private broadcaster: Broadcaster, private spinnerService: Ng4LoadingSpinnerService) {
    this.route.params.subscribe((params) => {
      this.action = params['action'];
      this.initializeStudent();
      if (this.action === 'new') {
        this.viewFlag = false;
      }
      if (this.action === 'edit') {
        this.viewFlag = false;
        this.student = this.broadcaster.storage;
      }
      if (this.action === 'view') {
        this.viewFlag = true;
        this.student = this.broadcaster.storage;
      }
      this.locale = Labels.en_IN.labels.page_title;
      this.formLocale = Labels.en_IN.labels.form_labels;
      this.pageTitle = this.locale[this.action] + ' ' + this.locale.student;
    });
  }

  ngOnInit() {
    this.checkLogin();
    this.role = UtilFunctions.getLocalStorage('role');
  }

  initializeStudent() {
    this.student = new Student(0, '', '', '', '', '', '', '', '', '', '', '' , '' , '' , 0, 0, '', '', '', '', 0, 0, '');
  }

  addStudent(data) {
    console.log(data);
    this.spinnerService.show();
    if (this.action === 'new') {
      this._student.saveStudent(data).subscribe((res) => {
        console.log(res);
        this.spinnerService.hide();
    }, (resError) => {
    });
    }
    if (this.action === 'edit') {
      this._student.updateStudent(this.student.studentId, this.student).subscribe((res) => {
        console.log(res);
        this.spinnerService.hide();
      }, (resError) => {
      });
    }
  }

  backToList() {
    this.router.navigate(['/list/student']);
  }

  checkLogin() {
    const user = UtilFunctions.getLocalStorage('user');
    if ( user ) {
      return;
    }
    this.router.navigate(['/login']);
  }

}
