import { Router } from 'express'
import { statsController } from '../controllers/statsController'
import { authMiddleware } from '../middleware/authMiddleware'

const router = Router()

router.get(
  '/unregistered-students',
  authMiddleware('admin'),
  statsController.getUnregisteredStudents
)
router.get(
  '/course-students/:courseId',
  authMiddleware('admin'),
  statsController.getCourseStudents
)
router.get(
  '/student-courses/:studentId',
  authMiddleware('admin'),
  statsController.getStudentCourses
)

export default router
