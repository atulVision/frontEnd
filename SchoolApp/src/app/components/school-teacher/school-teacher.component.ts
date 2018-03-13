import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppConfig } from '../../utils/app-config';
import { Labels } from '../../utils/labels';
import { Router } from '@angular/router';
import { UtilFunctions } from '../../utils/util-functions';
import { DataServiceService } from '../../services/data-service.service';
import { Teacher } from '../../models/teacher.model';
import { TeacherService } from '../../services/teacher.service';

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

  constructor(private route: ActivatedRoute, private router: Router, private _data: DataServiceService, private _teacher: TeacherService) {
    this.route.params.subscribe((params) => {
      this.action = params['action'];
      this.initializeTeacher();
      if (this.action === 'new') {
        this.viewFlag = false;
      }
      if (this.action === 'edit') {
        this.viewFlag = false;
        this.teacher = this._data.storage;
      }
      if (this.action === 'view') {
        this.viewFlag = true;
        this.teacher = this._data.storage;
      }
      this.locale = Labels.en_IN.labels.page_title;
      this.pageTitle = this.locale[this.action] + " " + this.locale.book;
    });
  }

  ngOnInit() {
    const user = UtilFunctions.getLocalStorage('userName');
    if ( user ) {
      return;
    }
    this.router.navigate(['/login']);
  }

  initializeTeacher() {
    this.teacher = new Teacher(0, '', '', '', '', '', '', '', '', '', '','','','');
  }

  getTeacherList() {
  this._teacher.getTeacherList().subscribe((res) => {});
  }

  addTeacher(data) {
    console.log(data);
  }

}
