import { AppDataSource } from './../config/database'
import { User } from '../entities/user'
import { Registration } from '../entities/registration'

export const statsService = {
  async getUnregisteredStudents() {
    const userRepo = AppDataSource.getRepository(User)
    return await userRepo
      .createQueryBuilder('user')
      .where('user.role = :role', { role: 'student' })
      .leftJoin('user.registrations', 'registration')
      .having('COUNT(registration.id) = 0')
      .groupBy('user.id')
      .getMany()
  },

  async getCourseStudents(courseId: number) {
    const registrationRepo = AppDataSource.getRepository(Registration)
    return await registrationRepo.find({
      where: { course: { id: courseId } },
      relations: ['user']
    })
  },

  async getStudentCourses(studentId: number) {
    const registrationRepo = AppDataSource.getRepository(Registration)
    return await registrationRepo.find({
      where: { user: { id: studentId } },
      relations: ['course']
    })
  }
}
