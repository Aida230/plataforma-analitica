import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { prisma } from '../lib/prisma.js'
//POST /auth/register
//Body esperando: { email: string, password: string, name?: string, role?: 'ADMIN'|'ANALYST'|'EXEC' }

export async function register(req, res, next) {
  try {
    //1-Leer datos del body de momento sin zod, luego lo añado
    const { email, password, name, role } = req.body ?? {}

    //2-Validaciones minimas
    if (!email) return res.status(400).json({ error: 'email es obligatorio 😒'})
    if (!password) return res.status(400).json({ error: 'la contraseña es obligatoria 🥲'})
    //Opcional: controlo valores de role para evitar cosas raras
    const allowedRoles = ['ADMIN', 'ANALYST', 'EXEC']
    const roleSafe = allowedRoles.includes(role) ? role : undefined //si viene mal, me peino

    //3-Generar hash de contraseña
    const rounds = Number(process.env.BCRYPT_ROUNDS) || 10
    const passwordHash = await bcrypt.hash(String(password), rounds)

    //4-Crear el usuario
    const user = await prisma.user.create({
      data: {
        email,
        name,
        passwordHash, //guardo el hash nunca la contraseña!!
        ...(roleSafe ? { role: roleSafe } : {}), //si no se manda role, prisma pondrá EXEC por defecto
      },
      //5-Por seguridad evitar traer el hash en la respuesta
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
      }
    })
    //6- Responder 201 Created
    return res.status(201).json(user)
  } catch (err) {
    //Prisma P2002 -> violacion de unique (email duplicado)
    if (err?.code === 'P2002') {
      return res.status(409).json({ error: 'el email ya existe 😩'})
    }
    next(err)
  }
}

// POST /auth/login
// Body: { email: string, password: string }

export async function login(req, res, next) {
  try {
    const { email, password } = req.body ?? {}

    // Validación mínima
    if (!email) return res.status(400).json({ error: 'email es obligatorio 🥲' })
    if (!password) return res.status(400).json({ error: 'la contraseña es obligatoria 😩' })

    // 1) Buscar usuario por email con el hash
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        passwordHash: true, // <- necesario para comparar
      }
    })

    // 2) Usuario existe y tiene hash
    if (!user || !user.passwordHash) {
      return res.status(401).json({ error: 'credenciales inválidas' })
    }

    // 3) Comparar contraseñas
    const ok = await bcrypt.compare(String(password), user.passwordHash)
    if (!ok) {
      return res.status(401).json({ error: 'credenciales inválidas' })
    }

    // 4) Emitir JWT
    const secret = process.env.JWT_SECRET
    if (!secret) {
      // Mejor fallar explícitamente si falta la clave
      return res.status(500).json({ error: 'JWT_SECRET no está configurado' })
    }

    const payload = { sub: user.id, role: user.role }
    const token = jwt.sign(payload, secret, { expiresIn: '7d' })

    // 5) Responder sin el hash
    const { passwordHash, ...publicUser } = user
    return res.json({
      token,
      user: publicUser
    })
  } catch (err) {
    return next(err)
  }
}