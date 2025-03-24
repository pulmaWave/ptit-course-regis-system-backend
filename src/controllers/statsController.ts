import { Request, Response } from 'express'
import { statsService } from '../services/statsService'

export const statsController = {
  async getUnregisteredStudents(req: Request, res: Response) {
    try {
      const students = await statsService.getUnregisteredStudents()
      res.json(students)
    } catch (error: any) {
      res.status(500).json({ message: error.message })
    }
  },

  async getCourseStudents(req: Request, res: Response) {
    try {
      const { courseId } = req.params
      const students = await statsService.getCourseStudents(parseInt(courseId))
      res.json(students)
    } catch (error: any) {
      res.status(500).json({ message: error.message })
    }
  },

  async getStudentCourses(req: Request, res: Response) {
    try {
      const { studentId } = req.params
      const courses = await statsService.getStudentCourses(parseInt(studentId))
      res.json(courses)
    } catch (error: any) {
      res.status(500).json({ message: error.message })
    }
  }
}
