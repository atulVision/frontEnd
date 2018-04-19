import { Classes } from './classes.model';

// Author : Tushar Upadhyay

export class Subject {
  public subjectId: number;
  public subjectName: string;
  public classId: Classes;
  public description: string;

  constructor(subjectId: number,
    subjectName: string,
    classId: Classes,
    description: string
  ) {
    this.subjectId = subjectId;
    this.subjectName = subjectName;
    this.classId = classId;
    this.description = description;
  }

}
