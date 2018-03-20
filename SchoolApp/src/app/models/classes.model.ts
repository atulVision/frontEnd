import { Division } from './division.model';

export class Classes {

  public classId: number;
  public className: string;
  public divisionId: number;
  public teacherId: number;

  constructor(classId: number, className: string, divisionId: number, teacherId: number
  ) {
    this.classId = classId;
    this.className = className;
    this.divisionId = divisionId;
    this.teacherId = teacherId;
  }
}
