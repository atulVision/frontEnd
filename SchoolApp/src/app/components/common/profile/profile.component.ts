import { Component, OnInit } from '@angular/core';
import { AppConfig } from '../../../utils/app-config';
import { Labels } from '../../../utils/labels';
import { Router } from '@angular/router';
import { UtilFunctions } from '../../../utils/util-functions';
import { User } from '../../../models/user.model';
import { UserService } from '../../../services/user.service';
import { Broadcaster } from '../../../utils/broadcaster';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

// Author : Tushar Upadhay

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  action: string;
  viewFlag = false;
  user: User;
  locale: any;
  formLocale: any;

  constructor(private router: Router, private broadcaster: Broadcaster,
    private _user: UserService, private spinnerService: Ng4LoadingSpinnerService) {
  }

  ngOnInit() {
    this.checkLogin();
    this.initializeUser();
    this.locale = Labels.en_IN.labels.page_title;
    this.formLocale = Labels.en_IN.labels.form_labels;
  }

  initializeUser() {
    this.user = JSON.parse(UtilFunctions.getLocalStorage('user'));
    this.processDob('show');
  }

  processDob(action) {
    if (action === 'show') {
      const temp = this.user.dob.split('-');
      this.user.dob = {
        day: Number(temp[2]),
        month: Number(temp[1]),
        year: Number(temp[0])
      };
    }

    if (action === 'save') {
      const temp = this.user.dob.year + '-' + this.user.dob.month + '-' + this.user.dob.day;
      this.user.dob = temp;
    }
  }

  updateProfile(data) {
    this.processDob('save');
    this.spinnerService.show();
    this._user.updateProfile(this.user.userId, this.user).subscribe((res) => {
      this.spinnerService.hide();
    }, (resError) => {
    });
  }

  backToList() {
    this.router.navigate(['/dashboard']);
  }

  checkLogin() {
    const user = UtilFunctions.getLocalStorage('user');
    if (user) {
      return;
    }
    this.router.navigate(['/login']);
  }

}
