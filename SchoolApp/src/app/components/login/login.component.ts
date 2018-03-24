import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilFunctions } from '../../utils/util-functions';
import { Labels } from '../../utils/labels';
import { User } from '../../models/user.model';
import { LoginService } from '../../services/login.service';
import { isUndefined } from 'util';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Broadcaster } from '../../utils/broadcaster';

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
  roleFlag = false;
  roleVal: any;

  constructor(
    private router: Router,
    private _login: LoginService,
    private spinnerService: Ng4LoadingSpinnerService,
    private broadcaster: Broadcaster
  ) { }

  ngOnInit() {
    UtilFunctions.clearLocalStorage();
    this.locale = Labels.en_IN.labels.page_title;
    this.formLocale = Labels.en_IN.labels.form_labels;
    this.initializeUser();
  }

  initializeUser() {
    this.user = new User(0, '', '', '', '', '', '', '');
  }

  loginUser(data) {
    this.spinnerService.show();
    if (!data.email || !data.password || isUndefined(data.role)) {
      this.roleFlag = true;
      this.spinnerService.hide();
      return false;
    }
    UtilFunctions.setLocalStorage('role', data.role); //Remove
    this.broadcaster.broadcast('role', data.role); //Remove
    this.router.navigate(['/dashboard']); // Remove
    UtilFunctions.setLocalStorage('user', 'asd'); // Remove
    this.broadcaster.broadcast('user', 'asd'); // Remove
    this._login.login(data.role, this.user).subscribe(
      (res: User) => {
        if (res.email != null) {
          UtilFunctions.setLocalStorage('user', JSON.stringify(res));
          UtilFunctions.setLocalStorage('role', data.role);
          this.broadcaster.broadcast('user', res);
          this.broadcaster.broadcast('role', data.role);
          this.spinnerService.hide();
          this.router.navigate(['/dashboard']);
        } else {
          this.initializeUser();
          this.errorObj = {
            hasError: true,
            errorMsg: 'Username or Password is incorrect'
          };
          this.spinnerService.hide();
        }
      },
      resErr => {
        this.initializeUser();
        this.errorObj = {
          hasError: true,
          errorMsg: 'Username or Password is incorrect'
        };
        this.spinnerService.hide();
      }
    );
  }
}
