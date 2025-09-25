import { Router } from 'express'
import { getKpiSummary, getKpiTimeseries } from '../controllers/kpis.controller.js'
import { validate } from '../middlewares/validate.js'
import { KpiSchemas } from '../schemas/kpis.schemas.js'
import { requireAuth } from '../middlewares/auth.middleware.js'
// Creamos un enrutador específico para KPIs.
// Todas las rutas definidas aquí se montarán bajo el prefijo elegido en el agregador (ver Paso 3).
export const kpisRouter = Router()

// ⬇️ Aplicamos el middleware a todo lo que cuelga de /kpis/*
//    - A partir de esta línea, cualquier GET /kpis/... exigirá un token válido
kpisRouter.use(requireAuth)

// GET /kpis/summary
// Devuelve un resumen agregado de KPIs.
// Puede aceptar parámetros de consulta "start" y "end" (ISO), que por ahora no filtran (mock),
// pero preparamos la estructura para que, al conectar datos reales, la lógica ya esté lista.
kpisRouter.get('/summary', validate(KpiSchemas.summary), getKpiSummary);

// GET /kpis/timeseries
// Devuelve una serie temporal para gráficos (líneas, barras, etc.).
// Acepta "start", "end" y "granularity" (day | week | month), con valores por defecto razonables.
kpisRouter.get('/timeseries', validate(KpiSchemas.timeseries), getKpiTimeseries)