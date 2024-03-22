export class ApiError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith(4) ? "fail" : "error";
    this.success = false
    this.isOperational = true
    Error.captureStackTrace(this, this.constructor)
  }
}
