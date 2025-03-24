import { AppDataSource } from './../config/database'
import { Registration } from '../entities/registration'
import { RegistrationPeriod } from '../entities/registrationPeriod'
import { Course } from '../entities/course'

export const registrationService = {
  async register(userId: number, courseId: number) {
    const periodRepo = AppDataSource.getRepository(RegistrationPeriod)
    const period = await periodRepo.findOne({})
    const now = new Date()
    if (
      !period?.start_time ||
      !period?.end_time ||
      now < period.start_time ||
      now > period.end_time
    ) {
      throw new Error('Registration period is closed')
    }
    const courseRepo = AppDataSource.getRepository(Course)
    const course = await courseRepo.findOneOrFail({ where: { id: courseId } })
    const registrationRepo = AppDataSource.getRepository(Registration)
    const currentCount = await registrationRepo.count({
      where: { course: { id: courseId } }
    })
    if (!course.max_registrations || currentCount >= course.max_registrations)
      throw new Error('Course is full')
    const existing = await registrationRepo.findOne({
      where: { user: { id: userId }, course: { id: courseId } }
    })
    if (existing) throw new Error('Already registered')
    const registration = registrationRepo.create({
      user: { id: userId },
      course: { id: courseId },
      registered_at: now
    })
    return await registrationRepo.save(registration)
  },

  async unregister(userId: number, courseId: number) {
    const periodRepo = AppDataSource.getRepository(RegistrationPeriod)
    const period = await periodRepo.findOne({})
    const now = new Date()
    if (
      !period?.start_time ||
      !period?.end_time ||
      now < period.start_time ||
      now > period.end_time
    ) {
      throw new Error('Registration period is closed')
    }
    const registrationRepo = AppDataSource.getRepository(Registration)
    await registrationRepo.delete({
      user: { id: userId },
      course: { id: courseId }
    })
  }
}
