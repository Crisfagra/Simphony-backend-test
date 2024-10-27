import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) {
    return res.status(401).json({ message: 'Access denied, no token provided' })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'jwt_secret')
    req.user = decoded
    next()
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    return res.status(403).json({ message: 'Invalid token' })
  }
}
