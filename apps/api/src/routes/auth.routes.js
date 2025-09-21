import { Router } from 'express'
import { register, login } from '../controllers/auth.controller.js'

const router = Router();

//POST /auth/register
router.post('/register', register);

//POST /auth/login
router.post('/login', login)

export default router;