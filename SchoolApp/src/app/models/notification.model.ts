export class Notification {
  public notificationId: number;
  public type: string;
  public title: string;
  public body: string;
  public classDiv: ClassDiv[];


  constructor(notificationId: number, type: string,
    title: string, body: string, classDiv: ClassDiv[]) {
    this.notificationId = notificationId;
    this.type = type;
    this.title = title;
    this.body = body;
    this.classDiv = classDiv;
  }
}

export class ClassDiv {
  public classId: number;
  public divisionId: number;

  constructor(classId: number, divisionId: number) {
    this.classId = classId;
    this.divisionId = divisionId;
  }
}
