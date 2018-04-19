import { Classes } from './classes.model';
import { Division } from './division.model';
import { Student } from './student.model';

// Author : Tushar Upadhyay

export class Notification {
  public id: number;
  public tag: string;
  public title: string;
  public message: string;
  public classes: Classes;
  public division: Division;
  public notificationDate: any;
  public notificationTime: any;
  public studentList: Array<Student>;
  public allFlag: boolean;

  constructor(id: number,
    tag: string,
    title: string,
    message: string,
    classes: Classes,
    division: Division,
    notificationDate: any,
    notificationTime: any,
    studentList: Array<Student>,
    allFlag: boolean) {
    this.id = id;
    this.tag = tag;
    this.title = title;
    this.message = message;
    this.classes = classes;
    this.division = division;
    this.notificationDate = notificationDate;
    this.notificationTime = notificationTime;
    this.studentList = studentList;
    this.allFlag = allFlag;
  }
}
