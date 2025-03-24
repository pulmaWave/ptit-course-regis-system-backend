import { Request, Response } from 'express'
import { registrationService } from '../services/registrationService'

export const registrationController = {
  async register(req: Request, res: Response) {
    try {
      const userId = req.user!.id
      const { courseId } = req.body
      const registration = await registrationService.register(userId, courseId)
      res.status(201).json(registration)
    } catch (error: any) {
      res.status(400).json({ message: error.message })
    }
  },

  async unregister(req: Request, res: Response) {
    try {
      const userId = req.user!.id
      const { courseId } = req.params
      await registrationService.unregister(userId, parseInt(courseId))
      res.status(204).send()
    } catch (error: any) {
      res.status(400).json({ message: error.message })
    }
  }
}
