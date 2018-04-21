import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { Login } from '../model/login.model';
import { LoginService } from '../service/login.service';
import { resolveRendererType2 } from '@angular/core/src/view/util';
import { Broadcaster } from '../utils/broadcaster.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginObj: Login;

  constructor(private router: Router, private _login: LoginService, private broadcaster: Broadcaster) { }

  ngOnInit() {
    this.initLogin();
  }

  private initLogin() {
    this.loginObj = new Login ('', '');
  }

  loginuser(data) {
    console.log(this.loginObj);
    this._login.login(this.loginObj).subscribe(
      (res: any) => {
        this.broadcaster.storage = res;
        this.router.navigate(['parent-allocation']);
      },
      resErr => {

      }
    );
  }
}
