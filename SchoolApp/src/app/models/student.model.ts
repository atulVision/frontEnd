export class Student {
  public studentId: number;
    public firstName: string;
    public lastName: string;
    public createdAt: string;
    public updatedAt: string;
    public mobile: string;
    public state: string;
    public city: string;
    public email: string;
    public rollNo: string;
    public password: string;
    public address: string;
    public profile: string;


    constructor(studentId: number, firstName: string, address: string,
      createdAt: string, updatedAt: string, lastName: string,
      mobile: string, email: string, state: string,
      rollNo: string, password: string, age: string, profile: string, city: string,
    ) {
      this.studentId = studentId;
      this.firstName = firstName;
      this.address = address;
      this.lastName = lastName;
      this.createdAt = createdAt;
      this.updatedAt = updatedAt;
      this.mobile = mobile;
      this.email = email;
      this.state = state;
      this.rollNo = rollNo;
      this.password = password;
      this.city = city;
      this.profile = profile;
    }

}
