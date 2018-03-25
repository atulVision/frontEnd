import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppConfig } from '../../utils/app-config';
import { Labels } from '../../utils/labels';
import { Router } from '@angular/router';
import { UtilFunctions } from '../../utils/util-functions';
import { DataServiceService } from '../../services/data-service.service';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  action: string;
  viewFlag = false;
  user: User;
  pageTitle: any;
  locale: any;
  formLocale: any;

  constructor(private route: ActivatedRoute, private router: Router, private _data: DataServiceService, private _user: UserService) {
    this.route.params.subscribe((params) => {
      this.action = params['action'];
      this.initializeUser();
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

  initializeUser() {
    this.user = new User(0, '', '', '', '', '', '', '', '');
  }

  addStudent(data) {
  this._user.updateProfile(this.user.userId, this.user).subscribe((res) => {
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
