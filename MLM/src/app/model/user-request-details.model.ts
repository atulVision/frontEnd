import { UserRegistration } from './user-registration.model';

export class UserRequestDetails {
  public urdID: number;
  public fromId: UserRegistration;
  public toId: UserRegistration;
  public status: string;
  public points: string;

  constructor(urdID: number,
    fromId: UserRegistration,
    toId: UserRegistration,
    status: string,
    points: string
  ) {
    this.urdID = urdID;
    this.fromId = fromId;
    this.toId = toId;
    this.status = status;
    this.points = points;
  }
}
