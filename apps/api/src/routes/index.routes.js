// Agregador principal de rutas. Aquí importamos los distintos routers
// Esto facilita añadir nuevos dominios de la API sin tocar index.js.

import { Router } from 'express'
import { usersRouter } from './users.routes.js'
import { kpisRouter } from './kpis.routes.js'

export const apiRouter = Router()

// aquí cuelgas todos los módulos de rutas
apiRouter.use('/users', usersRouter)
apiRouter.use('/kpis', kpisRouter)

