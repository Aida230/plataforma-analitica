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

export const usersRouter = Router()

usersRouter.get('/', validate(UsersSchemas.list), listUsers)
usersRouter.get('/:id', validate(UsersSchemas.getById), getUserById)
usersRouter.post('/', validate(UsersSchemas.create), createUser)
usersRouter.put('/:id', validate(UsersSchemas.replace), replaceUser)
usersRouter.patch('/:id', validate(UsersSchemas.update), updateUser)
usersRouter.delete('/:id', validate(UsersSchemas.remove), deleteUser)