import { prisma } from '../lib/prisma.js'

//Selección segura para nunca devolver passwordHash
const publicUserSelect = {
  id: true,
  email: true,
  name: true,
  role: true,
  createdAt: true,
}

// GET /users
export async function listUsers(req, res, next) {
  try {
    /**
     * Tomamos los valores ya validados por zod
     * -Si la ruta tiene validate(UsersSchemas.list, tendré req.validateData.query)
     * -Si por lo que sea no pasara por validate, usamos req.query y ponemos defaults (1,20)
     */
    const { page = 1, limit = 20, search } = (req.validatedData?.query ?? req.query)

    /**
     * Filtro opcional:
     * -Si "search" existe, buscamos coincidencias en email o name (case-insensitive)
     * -Si "search" no existe, "where" será undefined -> sin filtro
     */
    const where = search ? {
      OR: [
        { email: { contains: search, mode: 'insensitive'} },
        { name: { contains: search, mode: 'insensitive'} }
      ]
    }
    : undefined
    /**
     * Paginacion con Prisma:
     * - skip: cuantos registros saltar (por páginas anteriores)
     * - take: cuantos regstros devolver (tamaño de pagina)
     * Tambien devuelvo total para poder calcular TotalPages
     */
    const [total, users] = await Promise.all([
      prisma.user.count({ where }), // total de registros que cumplen el filtro
      prisma.user.findMany({
        where,
        orderBy: { createdAt: 'desc' }, // ordena por fecha creación descendente
        skip: (page-1) * limit,         // salta (p-1)*limit
        select: publicUserSelect, // ← no incluir passwordHash                    // salta (p-1)*limit
      })
    ])
    //Respuesta con metadatos de paginación
    res.json({
      page,                                   // página actual (número)
      limit,                                  // tamaño pagina
      total,                                  //total de registros que cumple con el filtro
      totalPages: Math.ceil(total / limit),   
      data: users                             //los usuarios de esta pagina
    })
  } catch (err) {
    next(err)
  }
}


// GET /users/:id
export async function getUserById(req, res, next) {
  try {
    const { id } = (req.validatedData?.params ?? req.params)

    const user = await prisma.user.findUnique({ 
      where: { id }, 
      select: publicUserSelect,
    })
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado'})
    res.json(user)
  } catch (err) {
    next(err)
  }
}

// POST /users
export async function createUser(req, res, next) {
  try {
    const { email, name } = (req.validatedData?.body ?? req.body)

    if (!email) return res.status(400).json({ error: 'El campo "email" es obligatorio'})
    const created = await prisma.user.create({ 
      data: { email, name },
      select: publicUserSelect,
    })
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
    const { id } = (req.validatedData?.params ?? req.params)
    const { email, name } = (req.validatedData?.body ?? req.body)

    const updated = await prisma.user.update({
      where: { id },
      data: {
        ...(email !== undefined ? { email } : {}),
        ...(name !== undefined ? { name }: {}),
      },
      select: publicUserSelect,
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
    const { id } = (req.validatedData?.params ?? req.params)
    const { email, name } = (req.validatedData?.body ?? req.body)

    const updated = await prisma.user.update({
      where: { id },
      data: {
        ...(email !== undefined ? { email } : {}),
        ...(name !== undefined ? { name } : {}),
      },
      select: publicUserSelect,
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
    const { id } = (req.validatedData?.params ?? req.params)
    
    await prisma.user.delete({ where: { id } })
    res.status(204).send()
  } catch (err) {
    if (err?.code === 'P2025') return res.status(404).json({ error: 'Usuario no encontrado'})
    next(err)
  }
}