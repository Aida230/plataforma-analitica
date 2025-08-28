import { Router } from 'express'
import { usersRouter } from './users.routes.js'

export const apiRouter = Router()

// aquí cuelgas todos los módulos de rutas
apiRouter.use('/users', usersRouter)

// ejemplo futuro:
// import { kpisRouter } from './kpis.routes.js'
// apiRouter.use('/kpis', kpisRouter)
