import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppConfig } from '../../utils/app-config';
import { Labels } from '../../utils/labels';
import { Router } from '@angular/router';
import { UtilFunctions } from '../../utils/util-functions';
import { Attendance } from '../../models/attendance.model';

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

  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.params.subscribe((params) => {
      this.action = params['action'];
      this.initializeAttendance();
      if (this.action === 'new') {
        this.viewFlag = false;
      }
      if (this.action === 'edit') {
        this.viewFlag = false;
      }
      if (this.action === 'view') {
        this.viewFlag = true;
      }
      this.locale = Labels.en_IN.labels.page_title;
      this.formLocale = Labels.en_IN.labels.form_labels;
      this.pageTitle = this.locale[this.action] + ' ' + this.locale.student;
    });
  }

  ngOnInit() {
 //  this.checkLogin();
  }

  checkLogin() {
    const user = UtilFunctions.getLocalStorage('user');
    if ( user ) {
      return;
    }
    this.router.navigate(['/login']);
  }

  initializeAttendance() {
    this.attendance = new Attendance(0, '', '', '', '', '', '');
  }
}
