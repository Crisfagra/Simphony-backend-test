import { plainToInstance } from 'class-transformer'
import { validate, ValidationError } from 'class-validator'
import { Request, Response, NextFunction } from 'express'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function validateDto(dtoClass: any) {
  return (req: Request, res: Response, next: NextFunction) => {
    const dtoInstance = plainToInstance(dtoClass, req.body)
    validate(dtoInstance).then((errors: ValidationError[]) => {
      if (errors.length > 0) {
        const formattedErrors = errors.map((err) => {
          return {
            property: err.property,
            constraints: err.constraints,
          }
        })
        res.status(400).json({
          message: 'Validation failed',
          errors: formattedErrors,
        })
      } else {
        next()
      }
    })
  }
}
