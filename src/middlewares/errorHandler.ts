import { Request, Response, NextFunction } from 'express'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack)

  const statusCode = err.status || 500

  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error',
  })
}
