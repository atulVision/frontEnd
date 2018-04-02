import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppConfig } from '../../../../utils/app-config';
import { Labels } from '../../../../utils/labels';
import { Router } from '@angular/router';
import { UtilFunctions } from '../../../../utils/util-functions';
import { Notification, ClassDiv } from '../../../../models/notification.model';

@Component({
  selector: 'app-school-notification',
  templateUrl: './school-notification.component.html',
  styleUrls: ['./school-notification.component.css']
})
export class SchoolNotificationComponent implements OnInit {

  action: string;
  pageTitle: any;
  locale: any;
  formLocale: any;
  viewFlag = false;
notification: Notification;
classDiv: ClassDiv;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.params.subscribe((params) => {
      this.action = params['action'];
      this.initializeNotification();
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
    this.checkLogin();
  }

  checkLogin() {
    const user = UtilFunctions.getLocalStorage('user');
    if ( user ) {
      return;
    }
    this.router.navigate(['/login']);
  }

  initializeNotification() {
    this.classDiv = new ClassDiv (0, 0);
    this.notification = new Notification (0, '', '', '', []);
  }

  backToList() {
    this.router.navigate(['/list/notification']);
  }

  addNotification(data) {

  }
}
