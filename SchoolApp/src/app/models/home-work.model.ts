import { Classes } from './classes.model';
import { Division } from './division.model';
import { Subject } from './subject.model';

// Author : Tushar Upadhyay

export class HomeWork {
  public homeWorkId: number;
  public homeWorkDate: any;
  public homeWorkDesc: string;
  public attachmentPic: string;
  public classId: Classes;
  public division: Division;
  public subject: Subject;
  public status: boolean;

  constructor(homeWorkId: number,
    homeWorkDate: any,
    homeWorkDesc: string,
    attachmentPic: string,
    classId: Classes,
    division: Division,
    subject: Subject,
    status: boolean) {
    this.homeWorkId = homeWorkId;
    this.homeWorkDate = homeWorkDate;
    this.homeWorkDesc = homeWorkDesc;
    this.attachmentPic = attachmentPic;
    this.classId = classId;
    this.division = division;
    this.subject = subject;
    this.status = status;
  }
}
