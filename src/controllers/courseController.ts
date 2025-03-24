import { Request, Response } from 'express'
import { courseService } from '../services/courseService'

export const courseController = {
  async createCourse(req: Request, res: Response) {
    try {
      const course = await courseService.createCourse(req.body)
      res.status(201).json(course)
    } catch (error: any) {
      res.status(400).json({ message: error.message })
    }
  },

  async updateCourse(req: Request, res: Response) {
    try {
      const { id } = req.params
      const course = await courseService.updateCourse(parseInt(id), req.body)
      res.json(course)
    } catch (error: any) {
      res.status(400).json({ message: error.message })
    }
  },

  async deleteCourse(req: Request, res: Response) {
    try {
      const { id } = req.params
      await courseService.deleteCourse(parseInt(id))
      res.status(204).send()
    } catch (error: any) {
      res.status(400).json({ message: error.message })
    }
  }
}
