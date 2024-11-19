export class HttpError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

export class BadRequest extends HttpError {
  constructor(message = " Bad Request") {
    super(message, 400);
  }
}

export class NotFoundError extends HttpError {
  constructor(message = "Not Found") {
    super(message, 404);
  }
}
