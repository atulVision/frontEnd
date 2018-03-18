export class Student {
  public studentId: number;
    public firstName: string;
    public lastName: string;
    public mobile: string;
    public state: string;
    public city: string;
    public email: string;
    public rollNo: string;
    public password: string;
    public address: string;
    public profile: string;
    public userName: string;


    constructor(studentId: number, firstName: string, address: string,
      lastName: string,
      mobile: string, email: string, state: string,
      rollNo: string, password: string, age: string, profile: string, city: string, userName: string
    ) {
      this.studentId = studentId;
      this.firstName = firstName;
      this.address = address;
      this.lastName = lastName;
      this.mobile = mobile;
      this.email = email;
      this.state = state;
      this.rollNo = rollNo;
      this.password = password;
      this.city = city;
      this.profile = profile;
      this.userName = userName;
    }

}
