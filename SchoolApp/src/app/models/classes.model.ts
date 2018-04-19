import { Division } from './division.model';
import { Teacher } from './teacher.model';

// Author : Tushar Upadhyay

export class Classes {
  public id: number;
  public className: string;
  public classDesc: string;
  public division: Division;
  public classTeacher: Teacher;

  constructor(id: number,
    className: string,
    classDesc: string,
    division: Division,
    classTeacher: Teacher
  ) {
    this.id = id;
    this.className = className;
    this.classDesc = classDesc;
    this.division = division;
    this.classTeacher = classTeacher;
  }
}
