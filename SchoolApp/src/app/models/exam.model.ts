export class Exam {

  public id: number;
  public examName: string;
  public examDesc: string;

  constructor(id: number, examName: string, examDesc: string
  ) {
    this.id = id;
    this.examName = examName;
    this.examDesc = examDesc;
  }

}
