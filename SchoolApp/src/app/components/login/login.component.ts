import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilFunctions } from '../../utils/util-functions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    UtilFunctions.clearLocalStorage();
  }

  loginUser() {
    UtilFunctions.setLocalStorage('userName', 'yes');
    this.router.navigate(['/dashboard']);
  }
}
