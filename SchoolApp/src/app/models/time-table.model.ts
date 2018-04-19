import { Classes } from './classes.model';
import { Division } from './division.model';
import { Subject } from './subject.model';
import { Day } from './day.model';

// Author : Tushar Upadhyay

export class TimeTable {
  public id: number;
  public title: string;
  public classes: Classes;
  public division: Division;
  public subject: Subject;
  public day: Day;
  public time: any;

  constructor(id: number,
    title: string,
    classes: Classes,
    division: Division,
    subject: Subject,
    day: Day,
    time: any
  ) {
    this.id = id;
    this.title = title;
    this.classes = classes;
    this.division = division;
    this.subject = subject;
    this.day = day;
    this.time = time;
  }

}

