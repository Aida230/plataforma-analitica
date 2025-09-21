para arrancar mi proyecto backend:
cd apps/api
  npm run dev

para la migracion de la base de datos ejecutamos esto:
npx prisma migrate dev --name init

ejecutar el scripts de creacion de usuario:
node scripts/seed.mjs

ejecutar script de consulta de usuario:
node scripts/list.mjs

para formatear el esquema de prisma
npx prisma format

para hacer la migracion de add_auth_fields de los hash 
npx prisma migrate dev --name add-auth-fields

-----------------------------------------------------------------------------------------
para registrar un usuario en POSTMAN
Método: POST

URL: http://localhost:4000/auth/register

Headers:

Content-Type: application/json

Body → raw → JSON:

{
  "name": "Ada Lovelace",
  "email": "ada+1@example.com",
  "password": "secret123"
}
