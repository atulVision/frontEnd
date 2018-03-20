export class Student {
  public studentId: number;
  public firstName: string;
  public lastName: string;
  public contactNo: string;
  public email: string;
  public rollNo: string;
  public password: string;
  public address: string;
  public profile: string;
  public routeName: string;
  public busStop: string;

  constructor(studentId: number, firstName: string, address: string,
    lastName: string, contactNo: string, email: string, rollNo: string,
    password: string, profile: string, routeName: string, busStop: string
  ) {
    this.studentId = studentId;
    this.firstName = firstName;
    this.address = address;
    this.lastName = lastName;
    this.contactNo = contactNo;
    this.email = email;
    this.rollNo = rollNo;
    this.password = password;
    this.profile = profile;
    this.routeName = routeName;
    this.busStop = busStop;
  }

}
