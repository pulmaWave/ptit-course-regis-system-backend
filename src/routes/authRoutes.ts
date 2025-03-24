import { Router } from 'express'
import { authController } from '../controllers/authController'

const router = Router()

router.post('/login', authController.login)
router.post('/refresh-token', authController.refreshToken)
router.post('/logout', authController.logout)
router.post('/register', authController.register)
router.post('/verify-token', authController.verifyToken)

export default router
