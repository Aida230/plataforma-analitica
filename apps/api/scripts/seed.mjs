//Importamos el cliente de Prisma desde node_modules
import { PrismaClient } from '@prisma/client';

//Creamos una instacia
const prisma = new PrismaClient();

//Funcion principal:
async function creaUsuario() {
  const user = await prisma.user.create({
    data: {
      email: 'demo1@example.com',
      name: 'Demo1'
    }
  })

  console.log('✅ Usuario creado:', user)
}

//Ejecitar funcion:

creaUsuario()
  .catch((e) => {
    console.error('❌ Error:', e)
    process.exit(1)
  })
  .finally(async () => {
    // Cerramos la conexión con la base
    await prisma.$disconnect()
  })