import { AppDataSource } from '../config/database'
import { Course } from '../entities/course'

export const courseService = {
  async createCourse(data: Partial<Course>) {
    const courseRepo = AppDataSource.getRepository(Course)
    const existing = await courseRepo.findOne({ where: { code: data.code } })
    if (existing) throw new Error('Course code already exists')
    const course = courseRepo.create(data)
    return await courseRepo.save(course)
  },

  async updateCourse(id: number, data: Partial<Course>) {
    const courseRepo = AppDataSource.getRepository(Course)
    const course = await courseRepo.findOneOrFail({ where: { id } })
    courseRepo.merge(course, data)
    return await courseRepo.save(course)
  },

  async deleteCourse(id: number) {
    const courseRepo = AppDataSource.getRepository(Course)
    const registrationRepo = AppDataSource.getRepository('Registration')
    const registrations = await registrationRepo.count({
      where: { course: { id } }
    })
    if (registrations > 0)
      throw new Error('Cannot delete course with registrations')
    await courseRepo.delete(id)
  }
}
