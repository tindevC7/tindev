import { Request, Response, NextFunction, ErrorRequestHandler } from 'express'
// fn -> controller function or middleware
const catchAsync = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch((err: ErrorRequestHandler) => next(err))
  }
}

export { catchAsync }
