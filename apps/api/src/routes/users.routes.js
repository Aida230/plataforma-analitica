import { Router } from 'express'
import {
  listUsers,
  getUserById,
  createUser,
  replaceUser,
  updateUser,
  deleteUser,
} from '../controllers/users.controller.js'
import { validate } from '../middlewares/validate.js'
import { UsersSchemas } from '../schemas/users.schema.js'

import { requireAuth } from '../middlewares/auth.middleware.js'
import { requireRole } from '../middlewares/role.middleware.js'

export const usersRouter = Router()

usersRouter.use(requireAuth)

usersRouter.get('/', requireRole('ADMIN', 'ANALYST'), validate(UsersSchemas.list), listUsers)
usersRouter.get('/:id', requireRole('ADMIN', 'ANALYST'), validate(UsersSchemas.getById), getUserById)
usersRouter.post('/', requireRole('ADMIN'), validate(UsersSchemas.create), createUser)
usersRouter.put('/:id', requireRole('ADMIN'), validate(UsersSchemas.replace), replaceUser)
usersRouter.patch('/:id', requireRole('ADMIN'), validate(UsersSchemas.update), updateUser)
usersRouter.delete('/:id', requireRole('ADMIN'), validate(UsersSchemas.remove), deleteUser)