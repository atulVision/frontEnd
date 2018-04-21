import { Component, OnInit } from '@angular/core';
import { UserRegistration } from '../model/user-registration.model';
import { BankDetails } from '../model/bank-details.model';
import { UserRegistrationService } from '../service/user-registration.service';
import { Broadcaster } from '../utils/broadcaster.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  profileObj: UserRegistration;
temp: UserRegistration;

  constructor(private _user: UserRegistrationService, private broadcaster: Broadcaster) { }

  ngOnInit() {
    this.initProfile();
  }

  private initProfile() {
    this.temp = new UserRegistration (null, null, null, '', '', '', '', '', '', '', null, '', '', '', '',
    new BankDetails(null, '', '', '', '', '', '', '', '', ''));
    this.profileObj = new UserRegistration (null, this.temp, this.temp, '', '', '', '', '', '', '', null, '', '', '', '',
    new BankDetails(null, '', '', '', '', '', '', '', '', ''));
    this.profileObj = this.broadcaster.storage;
  }

  public updateProfile (data) {
console.log(this.profileObj);
this._user.updateUser(this.profileObj).subscribe(
  (res: any) => {
    this.broadcaster.storage = res;
    console.log(res);
  },
  resErr => {

  }
);
  }

}
