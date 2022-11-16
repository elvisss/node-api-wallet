export class ApplicationException extends Error {
  constructor(message = 'An unexpected error ocurred', public status = 400) {
    super(message)
    this.status = status
  }
}
