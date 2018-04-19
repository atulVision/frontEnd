import { Student } from './student.model';
import { Classes } from './classes.model';
import { Division } from './division.model';
import { Subject } from './subject.model';
import { Teacher } from './teacher.model';

// Author : Tushar Upadhyay

export class Attendance {
  public attendanceId: number;
  public classes: Classes;
  public division: Division;
  public attendanceDate: any;
  public attendanceTime: any;
  public subjectId: Subject;
  public studentAttendanes: Array<StudentAttendance>;
  public teacherId: Teacher;

  constructor(attendanceId: number,
    classes: Classes,
    division: Division,
    attendanceDate: any,
    attendanceTime: any,
    subjectId: Subject,
    studentAttendanes: Array<StudentAttendance>,
    teacherId: Teacher
  ) {
    this.attendanceId = attendanceId;
    this.classes = classes;
    this.division = division;
    this.attendanceDate = attendanceDate;
    this.attendanceTime = attendanceTime;
    this.subjectId = subjectId;
    this.studentAttendanes = studentAttendanes;
    this.teacherId = teacherId;
  }
}

export class StudentAttendance {
  public id: number;
  public attandandceFlag: string;
  public student: Student;

  constructor(id: number,
    attandandceFlag: string,
    student: Student
  ) {
    this.id = id;
    this.attandandceFlag = attandandceFlag;
    this.student = student;

  }

}
