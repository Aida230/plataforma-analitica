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
  } catch {
    //Prisma P2002 -> violacion de unique (email duplicado)
    if (err?.code === 'P2002') {
      return res.status(409).json({ error: 'el email ya existe 😩'})
    }
    next(err)
  }
}