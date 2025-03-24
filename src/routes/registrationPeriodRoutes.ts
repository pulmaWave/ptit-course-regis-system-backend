import { Router } from 'express'
import { registrationPeriodController } from '../controllers/registrationPeriodController'
import { authMiddleware } from '../middleware/authMiddleware'

const router = Router()

router.put(
  '/',
  authMiddleware('admin'),
  registrationPeriodController.updateRegistrationPeriod
)
router.get('/', registrationPeriodController.getRegistrationPeriod)

export default router
