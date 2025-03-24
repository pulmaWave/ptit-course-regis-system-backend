import { Request, Response } from 'express'
import { authService } from '../services/authService'

export const authController = {
  async login(req: Request, res: Response) {
    try {
      const { username, password } = req.body.data
      const tokens = await authService.login(username, password)
      res.json(tokens)
    } catch (error: any) {
      res.status(401).json({ message: error.message })
    }
  },
  async refreshToken(req: Request, res: Response) {
    try {
      const { refreshToken } = req.body
      const accessToken = await authService.refreshToken(refreshToken)
      res.json({ accessToken })
    } catch (error: any) {
      res.status(401).json({ message: error.message })
    }
  },
  async logout(req: Request, res: Response) {
    try {
      const { refreshToken } = req.body
      await authService.logout(refreshToken)
      res.status(204).send()
    } catch (error: any) {
      res.status(500).json({ message: error.message })
    }
  },
  async register(req: Request, res: Response) {
    try {
      const { username, password, name, email, academicYear, major } = req.body
      const result = await authService.register(
        username,
        password,
        name,
        email,
        academicYear,
        major
      )
      res.status(201).json(result)
    } catch (error: any) {
      res.status(400).json({ message: error.message })
    }
  },
  async verifyToken(req: Request, res: Response) {
    try {
      const { accessToken } = req.body
      if (!accessToken) {
        res.status(400).json({ message: 'accessToken is required' })
      }
      const isValid = await authService.verifyToken(accessToken)
      res.json(isValid)
    } catch (error) {
      res.status(500).json({ message: 'Server error' })
    }
  }
}
