import { prisma } from '../lib/prisma.js'

// GET /users
export async function listUsers(req, res, next) {
  try {
    const users = await prisma.user.findMany({ orderBy: { createdAt: 'desc'} })
    res.json(users)
  } catch (err) {
    next(err)
  }
}

// GET /users/:id
export async function getUserById(req, res, next) {
  try {
    const { id } = req.params
    const user = await prisma.user.findUnique({ where: { id } })
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado'})
    res.json(user)
  } catch (err) {
    next(err)
  }
}

// POST /users
export async function createUser(req, res, next) {
  try {
    const { email, name } = req.body
    if (!email) return res.status(400).json({ error: 'El campo "email" es obligatorio'})
    const created = await prisma.user.create({ data: { email, name }})
    res.status(201).json(created)
  } catch (err) {
    // Prisma P2002 → unique (email duplicado)
    if (err?.code === 'P2002') {
      return res.status(409).json({ error: 'El "email" ya existe'}) 
    }
    next(err)
  }  
}

// PUT /users/ completamente, email y nombre

export async function replaceUser(req, res, next) {
  try {
    const { id } = req.params
    const { email, name } = req.body
    const updated = await prisma.user.update({
      where: { id },
      data: {
        ...(email !== undefined ? { email } : {}),
        ...(name !== undefined ? { name }: {}),
      },
    })
    res.json(updated)
  } catch (err) {
    if (err?.code === 'P2025') return res.status(404).json({ error: 'Usuario no encontrado'})
    if (err?.code === 'P2002') return res.status(409).json({ error: 'El email ya existe'})
    next(err)
  }
}

// PATCH /users/:id
export async function updateUser(req, res, next) {
  try {
    const { id } = req.params
    const { email, name } = req.body
    const updated = await prisma.user.update({
      where: { id },
      data: {
        ...(email !== undefined ? { email } : {}),
        ...(name !== undefined ? { name } : {}),
      },
    })
    res.json(updated)
  } catch (err) {
    if (err?.code === 'P2025') return res.status(404).json({ error: 'Usuario no encontrado' })
    if (err?.code === 'P2002') return res.status(409).json({ error: 'El email ya existe' })
    next(err)
  }
}

// DELETE /users/:id

export async function deleteUser(req, res, next) {
  try {
    const { id } = req.params
    await prisma.user.delete({ where: { id } })
    res.status(204).send()
  } catch (err) {
    if (err?.code === 'P2025') return res.status(404).json({ error: 'Usuario no encontrado'})
    next(err)
  }
}