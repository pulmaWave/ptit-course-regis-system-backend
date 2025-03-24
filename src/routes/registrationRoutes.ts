import { Router } from 'express'
import { registrationController } from '../controllers/registrationController'
import { authMiddleware } from '../middleware/authMiddleware'

const router = Router()

router.post('/', authMiddleware('student'), registrationController.register)
router.delete(
  '/:courseId',
  authMiddleware('student'),
  registrationController.unregister
)

export default router
