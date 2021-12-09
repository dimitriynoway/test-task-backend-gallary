export class BadRequestError {
  public message: string;
  public status: number;
  constructor(message: string) {
    this.message = message;
    this.status = 400;
  }
}
