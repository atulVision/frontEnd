 import { Component, OnInit } from '@angular/core';
import { UserRegistration } from '../model/user-registration.model';
import { UserRegistrationService } from '../service/user-registration.service';

@Component({
  selector: 'app-bussiness',
  templateUrl: './bussiness.component.html',
  styleUrls: ['./bussiness.component.css']
})
export class BussinessComponent implements OnInit {

  userList: Array<UserRegistration>;
  constructor(private _user: UserRegistrationService) { }

  ngOnInit() {
    this.userList = [];
    this.getUserList();
  }

  private getUserList() {
this._user.getAllUser().subscribe(
  (res: any) => {
this.userList = res;
  },
  resErr => {

  }
);
  }

  public view (data) {
    console.log(data);
  }
}
