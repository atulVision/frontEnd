export class Attendance {

  public attendanceId: number;
  public className: string;
  public division: string;
  public date: string;
  public day: string;
  public students: string;
  public presentEntries: string;

  constructor(attendanceId: number, className: string, division: string,
    date: string, day: string, students: string,
    presentEntries: string
  ) {
    this.attendanceId = attendanceId;
    this.className = className;
    this.division = division;
    this.date = date;
    this.students = students;
    this.presentEntries = presentEntries;
  }
}
