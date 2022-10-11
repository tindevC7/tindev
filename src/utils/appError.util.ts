class AppError extends Error {
  statusCode: number
  message: string
  status: string

  constructor (message: string, statusCode: number) {
    super(message)
    this.message = message
    this.statusCode = statusCode
    this.status = `${statusCode}`.startsWith('4') ? 'error' : 'fail'

    // Capture the error stack and add it to the AppError instance
    Error.captureStackTrace(this)
  }
}

export { AppError }
