export class BaseError extends Error {
  constructor (message, status = 500, errors = null) {
    super(message)
    this.statusCode = status
    this.errors = errors
  }
}
