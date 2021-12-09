export class UnauthorizedError {
  public message: string;
  public status: number;
  constructor() {
    this.message = "Unauthorized";
    this.status = 403;
  }
}
