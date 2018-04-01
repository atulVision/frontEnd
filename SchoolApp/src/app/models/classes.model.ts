import { Division } from './division.model';
import { Teacher } from './teacher.model';

export class Classes {

  public id: number;
  public className: string;
  public classDescription: string;
  public division: Division;
  public teacher: Teacher;

  constructor(id: number, className: string, classDescription: string,
    division: Division, teacher: Teacher
  ) {
    this.id = id;
    this.className = className;
    this.classDescription = classDescription;
    this.division = division;
    this.teacher = teacher;
  }
}
