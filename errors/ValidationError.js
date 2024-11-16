import { BaseError } from './BaseError.js'

export class ValidationError extends BaseError {
  constructor (message, errors = null) {
    super(message, 400, errors)
  }
}
