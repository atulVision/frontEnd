export class PaymentRequest {
  public prId: number;
  public fromId: number;
  public toId: number;
  public status: string;
  public prField1: string;
  public prField2: string;
  public points: string;

  constructor(prId: number,
    fromId: number,
    toId: number,
    status: string,
    prField1: string,
    prField2: string,
    points: string,
    tvdField1: string,
    tvdField2: string
  ) {
    this.prId = prId;
    this.fromId = fromId;
    this.toId = toId;
    this.status = status;
    this.prField1 = prField1;
    this.prField2 = prField2;
    this.points = points;
  }
}
