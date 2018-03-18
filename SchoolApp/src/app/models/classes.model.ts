import { Division } from './division.model';

export class Classes {

  public classId: number;
  public standard: string;
  public division: any;
  public teacherId: number;
  public totalStudents: number;

  constructor(classId: number, standard: string, divisionName: string,
    divisionDesc: string, teacherId: number, totalStudents: number
  ) {
    this.classId = classId;
    this.standard = standard;
    this.teacherId = teacherId;
    this.totalStudents = totalStudents;
  }
}
