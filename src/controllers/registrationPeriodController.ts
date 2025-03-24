import { Request, Response } from 'express'
import { registrationPeriodService } from '../services/registrationPeriodService'

export const registrationPeriodController = {
  async updateRegistrationPeriod(req: Request, res: Response) {
    try {
      const period = await registrationPeriodService.updateRegistrationPeriod(
        req.body
      )
      res.json(period)
    } catch (error: any) {
      res.status(400).json({ message: error.message })
    }
  },

  async getRegistrationPeriod(req: Request, res: Response) {
    try {
      const period = await registrationPeriodService.getRegistrationPeriod()
      res.json(period)
    } catch (error: any) {
      res.status(500).json({ message: error.message })
    }
  }
}
