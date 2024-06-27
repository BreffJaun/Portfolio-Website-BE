export class CustomError extends Error {
  statusCode: number;
  cause?: any;

  constructor(message: string, statusCode: number, cause?: any) {
    super(message);
    this.statusCode = statusCode;
    this.cause = cause;
  }
}
