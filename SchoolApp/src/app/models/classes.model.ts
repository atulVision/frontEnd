export class Classes {

  public classId: number;
  public className: string;
  public divisionName: string;
  public divisionDesc: string;
  public classTeacher: string;
  public totalStudents: string;

  constructor(classId: number, className: string, divisionName: string,
    divisionDesc: string, classTeacher: string, totalStudents: string
  ) {
    this.classId = classId;
    this.className = className;
    this.divisionName = divisionName;
    this.divisionDesc = divisionDesc;
    this.classTeacher = classTeacher;
    this.totalStudents = totalStudents;
  }
}
