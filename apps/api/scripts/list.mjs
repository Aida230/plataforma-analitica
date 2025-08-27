import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function listadoUsuario() {
  const users = await prisma.user.findMany()
  console.log('👥 Usuarios en la base de datos:')
  console.log(users)
}

listadoUsuario()
  .catch((e) => {
    console.error('❌ Error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
