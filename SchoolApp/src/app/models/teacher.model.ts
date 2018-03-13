export class Teacher {

    public teacherId: number;
    public name: string;
    public address: string;
    public createdAt: string;
    public updatedAt: string;
    public profile: string;
    public mobile: string;
    public email: string;
    public position: string;
    public userName: string;
    public password: string;
    public age: string;
    public imei: string;


    constructor(teacherId: number, name: string, address: string,
      createdAt: string, updatedAt: string, adharNUmber: string,
      mobile: string, email: string, position: string,
      userName: string, password: string, age: string, profile: string, imei: string
    ) {
      this.teacherId = teacherId;
      this.name = name;
      this.address = address;
      this.imei = imei;
      this.createdAt = createdAt;
      this.updatedAt = updatedAt;
      this.mobile = mobile;
      this.email = email;
      this.position = position;
      this.userName = userName;
      this.password = password;
      this.age = age;
      this.profile = profile;
    }
  }

