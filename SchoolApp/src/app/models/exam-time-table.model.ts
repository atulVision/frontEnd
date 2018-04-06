import { Exam } from './exam.model';
import { Classes } from './classes.model';
import { Division } from './division.model';
import { Subject } from './subject.model';

export class ExamTimeTable {

  public id: number;
  public examId: Exam;
  public classes: Classes;
  public division: Division;
  public subject: Subject;
  public examTime: string;
  public examDate: any;

  constructor(id: number, examId: Exam, classes: Classes,
    division: Division, subject: Subject, examTime: string, examDate: any
  ) {
    this.id = id;
    this.examId = examId;
    this.classes = classes;
    this.division = division;
    this.subject = subject;
    this.examTime = examTime;
    this.examDate = examDate;
  }
}
