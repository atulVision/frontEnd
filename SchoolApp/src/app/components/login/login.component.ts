import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilFunctions } from '../../utils/util-functions';
import { Labels } from '../../utils/labels';
import { User } from '../../models/user.model';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  submitted = false;
  locale: any;
  formLocale: any;
  user: User;
  errorObj: any = {};

  constructor(private router: Router, private _login: LoginService) { }

  ngOnInit() {
    UtilFunctions.clearLocalStorage();
    this.locale = Labels.en_IN.labels.page_title;
    this.formLocale = Labels.en_IN.labels.form_labels;
    this.initializeUser();
  }

  initializeUser() {
    this.user = new User(0, '', '', '', '', '', '', '', '', '', '', '', '');
  }

  loginUser(data) {
    if (!data.email || !data.password) {
      return false;
    }
    this._login.login(data).subscribe((res: User) => {
      if (res.email != null) {
        UtilFunctions.setLocalStorage('user', JSON.stringify(res));
        this.router.navigate(['/dashboard']);
      } else {
        this.initializeUser();
        this.errorObj = {
          hasError: true,
          errorMsg: 'Username or Password is incorrect'
        };
      }
    }, (resErr) => {
      this.initializeUser();
      this.errorObj = {
        hasError: true,
        errorMsg: 'Username or Password is incorrect'
      };
    });
  }
}
