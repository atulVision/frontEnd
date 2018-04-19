import { Classes } from './classes.model';
import { Division } from './division.model';
import { Exam } from './exam.model';
import { Student } from './student.model';
import { Subject } from './subject.model';

// Author : Tushar Upadhyay

export class Result {
  public id: number;
  public classes: Classes;
  public division: Division;
  public examId: Exam;
  public student: Student;
  public studentMarks: Array<StudentMarks>;
  public resultDate: any;

  constructor(id: number,
    classes: Classes,
    division: Division,
    student: Student,
    examId: Exam,
    studentMarks: Array<StudentMarks>,
    resultDate: any) {
    this.id = id;
    this.classes = classes;
    this.division = division;
    this.student = student;
    this.examId = examId;
    this.studentMarks = studentMarks;
    this.resultDate = resultDate;
  }
}

export class StudentMarks {
  public id: number;
  public obtainMark: number;
  public outOfMark: number;
  public grade: string;
  public subject: Subject;

  constructor(id: number,
    obtainMark: number,
    outOfMark: number,
    grade: string,
    subject: Subject
  ) {
    this.id = id;
    this.obtainMark = obtainMark;
    this.outOfMark = outOfMark;
    this.grade = grade;
    this.subject = subject;
  }

}
