import { Router } from 'express'
import { courseController } from '../controllers/courseController'
import { authMiddleware } from '../middleware/authMiddleware'

const router = Router()

router.post('/', authMiddleware('admin'), courseController.createCourse)
router.put('/:id', authMiddleware('admin'), courseController.updateCourse)
router.delete('/:id', authMiddleware('admin'), courseController.deleteCourse)

export default router
