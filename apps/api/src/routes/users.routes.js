import { Router } from 'express'
import {
  listUsers,
  getUserById,
  createUser,
  replaceUser,
  updateUser,
  deleteUser,
} from '../controllers/users.controller.js'

export const usersRouter = Router()

usersRouter.get('/', listUsers)
usersRouter.get('/:id', getUserById)
usersRouter.post('/', createUser)
usersRouter.put('/:id', replaceUser)
usersRouter.patch('/:id', updateUser)
usersRouter.delete('/:id', deleteUser)