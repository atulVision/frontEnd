export class Attendance {

  public attendanceId: number;
  public className: string;
  public division: string;
  public date: any;
  public time: any;
  public day: string;
  public students: string;
  public presentEntries: string;

  constructor(attendanceId: number, className: string, division: string,
    date: any, time: any, day: string, students: string,
    presentEntries: string
  ) {
    this.attendanceId = attendanceId;
    this.className = className;
    this.division = division;
    this.date = date;
    this.time = time;
    this.students = students;
    this.presentEntries = presentEntries;
  }
}
