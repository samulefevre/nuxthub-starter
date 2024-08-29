export class DatabaseOperationError extends Error {}

export class NotFoundError extends Error {}

export class InputParseError extends Error { }

export class UnexpectedError extends Error {
  constructor() {
    super('An unexpected error occurred, developers have been notified.')
  }
}
