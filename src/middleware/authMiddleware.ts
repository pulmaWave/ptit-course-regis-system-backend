import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { authConfig } from '../config/auth'

declare global {
  namespace Express {
    interface Request {
      user?: { id: number; role: string }
    }
  }
}

export const authMiddleware = (requiredRole?: string) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) {
      res.status(401).json({ message: 'No token provided' })
      return
    }

    try {
      const decoded = jwt.verify(token, authConfig.secret) as {
        id: number
        role: string
      }

      if (requiredRole && decoded.role !== requiredRole) {
        res.status(403).json({ message: 'Forbidden' })
        return
      }

      req.user = decoded
      next()
    } catch (error) {
      res.status(401).json({ message: 'Invalid token' })
    }
  }
}
