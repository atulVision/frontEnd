import { UserRegistration } from './user-registration.model';

export class BankDetails {
  public ID: number;
  public bankHolderName: string;
  public bankName: string;
  public branchName: string;
  public ifscCode: string;
  public bankCity: string;
  public accountNumber: string;
  public panNumber: string;
  public bankField1: string;
  public bankField2: string;
  //public userRegistration: UserRegistration;

  constructor(ID: number,
    bankHolderName: string,
    bankName: string,
    branchName: string,
    ifscCode: string,
    bankCity: string,
    accountNumber: string,
    panNumber: string,
    bankField1: string,
    bankField2: string,
  //  userRegistration: UserRegistration,
  ) {
    this.ID = ID;
    this.bankHolderName = bankHolderName;
    this.bankName = bankName;
    this.branchName = branchName;
    this.ifscCode = ifscCode;
    this.bankCity = bankCity;
    this.accountNumber = accountNumber;
    this.panNumber = panNumber;
    this.bankField1 = bankField1;
    this.bankField2 = bankField2;
 //   this.userRegistration = userRegistration;
  }
}
