import { Division } from './division.model';

export class Classes {

  public classId: number;
  public className: string;
  public classDescription: string;
  public divisionId: number;
  public teacherId: number;

  constructor(classId: number, className: string, classDescription: string,
    divisionId: number, teacherId: number
  ) {
    this.classId = classId;
    this.className = className;
    this.classDescription = classDescription;
    this.divisionId = divisionId;
    this.teacherId = teacherId;
  }
}
