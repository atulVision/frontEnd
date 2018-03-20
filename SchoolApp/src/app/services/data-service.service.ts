import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class DataServiceService {

  public storage: any;
  public storage_class: any;
  public storage_teacher: any;
  public storage_student: any;
  public storage_attendance: any;
  public storage_homeW: any;
  public storage_timeT: any;
  public storage_exam: any;
  public storage_result: any;
  public storage_driver: any;
  public storage_bus: any;
  public storage_route: any;
  public storage_book: any;
  public storage_album: any;
  public storage_notification: any;
  public storage_profile: any;

  private _profile = new BehaviorSubject<any>(null);


  profile = this._profile.asObservable();

  public constructor() { }

  updateProfile(profile: any) {
    this._profile.next(profile);
  }
}
