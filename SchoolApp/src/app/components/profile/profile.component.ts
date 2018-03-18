import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppConfig } from '../../utils/app-config';
import { Labels } from '../../utils/labels';
import { Router } from '@angular/router';
import { UtilFunctions } from '../../utils/util-functions';
import { DataServiceService } from '../../services/data-service.service';
import { Student } from '../../models/student.model';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  action: string;
  viewFlag = false;
  student: Student;
  pageTitle: any;
  locale: any;
  formLocale: any;

  constructor(private route: ActivatedRoute, private router: Router, private _data: DataServiceService, private _student: StudentService) {
    this.route.params.subscribe((params) => {
      this.action = params['action'];
      this.initializeStudent();
      if (this.action === 'new') {
        this.viewFlag = false;
      }
      if (this.action === 'edit') {
        this.viewFlag = false;
        this.student = this._data.storage;
      }
      if (this.action === 'view') {
        this.viewFlag = true;
        this.student = this._data.storage;
      }
      this.locale = Labels.en_IN.labels.page_title;
      this.formLocale = Labels.en_IN.labels.form_labels;
      this.pageTitle = this.locale[this.action] + " " + this.locale.student;
    });
  }

  ngOnInit() {
    this.checkLogin();
  }

  initializeStudent() {
    this.student = new Student(0, '', '', '', '', '', '', '', '', '', '', '', '');
  }

  addStudent(data) {
    console.log(data);
  this._student.saveStudent(data).subscribe((res) => {
    console.log(res);
}, (resError) => {
});

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
