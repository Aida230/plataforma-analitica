import { Router } from "express";
import { prisma } from '../lib/prisma.js'

export const usersRouter = Router();

// GET /users -> Lista par todos los usuarios

usersRouter.get('/', async (req, res) => {
  try {
    const users = await prisma.user.findMany()
    res.json(users)
  } catch (err) {
    console.error('Error listando usuarios:', err)
    res.status(500).json({ error: 'No se pudieron listar los anuncios'})
  }
})

// POST /users -> crear un usuario

usersRouter.post('/', async (req, res) => {
  try {
    const { email, name } = req.body
    if (!email) {
      return res.status(400).json({ error: 'El campo email es obligatorio'})
    }
    const newUser = await prisma.user.create({
      data: { email, name },
    })
    res.status(201).json(newUser)
  } catch (err) {
    console.error('Error creand Usuario:', err)
    if (String(err).includes('Unique constrain')){
      return res.status(409).json({ error: 'El email ya existe'})
    }
    res.status(500).json({ error: 'No se pudo crear el Usuario'})
  }
})