//Un unico PrismaClient para evitar crear multiples conexiones
import { PrismaClient } from "@prisma/client";

// Reutiliza la instancia en desarrollo (útil con nodemon)
const globalForPrisma = globalThis

export const prisma =
  globalForPrisma.prisma || new PrismaClient({
    // log: ['query', 'error', 'warn'], // <- descomenta si quieres ver queries por consola
  })

  if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma