import { Component, OnInit } from '@angular/core';
import { MyDataTransferService } from './my-data-transfer.service';
import { UserRegistrationService } from '../service/user-registration.service';
import { Router } from '@angular/router';
import { UserRegistration } from '../model/user-registration.model';
import { BankDetails } from '../model/bank-details.model';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  regObj: UserRegistration;
temp: UserRegistration;
  constructor(private router: Router, private _userReg: UserRegistrationService) { }

  ngOnInit() {
    this.initLogin();
  }

  private initLogin() {
    this.temp = new UserRegistration (null, null, null, '', '', '', '', '', '', '', null, '', '', '', '',
    new BankDetails(null, '', '', '', '', '', '', '', '', ''));
    this.regObj = new UserRegistration (null, this.temp, this.temp, '', '', '', '', '', '', '', null, '', '', '', '',
    new BankDetails(null, '', '', '', '', '', '', '', '', ''));
  }

  public onSubmit (data) {
    console.log(this.regObj);
    this._userReg.saveUser(this.regObj).subscribe(
      (res: any) => {
        console.log(res);
      },
      resErr => {

      }
    );
  }
}
