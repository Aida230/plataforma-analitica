para arrancar mi proyecto backend:
cd apps/api
  npm run dev

para la migracion de la base de datos ejecutamos esto:
npx prisma migrate dev --name init

ejecutar el scripts de creacion de usuario:
node scripts/seed.mjs

ejecutar script de consulta de usuario:
node scripts/list.mjs